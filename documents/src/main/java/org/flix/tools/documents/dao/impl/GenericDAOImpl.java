package org.flix.tools.documents.dao.impl;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.management.RuntimeErrorException;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;

import org.flix.tools.documents.dao.GenericDAO;
//import org.apache.ws.security.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;


/**
 * Generic DAO implementation.
 *
 * @author ED
 */
@Repository
public class GenericDAOImpl<T, ID extends Serializable> extends AbstractGenericDAOImpl implements GenericDAO<T, ID> {
	private static final Logger LOG = LoggerFactory.getLogger(GenericDAOImpl.class);

	private static final String SELECT_O_FROM = "select o from ";

	private static final String FIELD_VALUE = "fieldValue";
	
	public static final String NUMBER_TYPE = "Number";

	public static final String VARCHAR_TYPE = "Varchar";

	public static final String DATE_TYPE = "Date";

	/**
	 * {@inheritDoc}
	 */
	public T create(T t) {
		this.em.persist(t);
		return t;
	}

	/**
	 * {@inheritDoc}
	 */
	public T create(T t, boolean flushOperation) {
		this.em.persist(t);
		if (flushOperation) {
			this.em.flush();
			this.em.refresh(t);
		}
		return t;
	}

	/**
	 * {@inheritDoc}
	 */
	public boolean exists(Class<T> type, ID id) {
		return find(type, id) != null;
	}

	/**
	 * {@inheritDoc}
	 */
	public T find(Class<T> type, ID id) {
		return this.em.find(type, id);
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	public T findByField(Class<T> t, String field, String value, Class<?> type) {
		String fieldStr = field;
		if (String.class.equals(type)) {
			fieldStr = "lower(o." + field + ")";
		}
		String sQuery = SELECT_O_FROM + t.getSimpleName() + " o where " + fieldStr + " = :fieldValue";
		Query hsql = this.em.createQuery(sQuery);
		if (Long.class.equals(type)) {
			hsql.setParameter(FIELD_VALUE, Long.valueOf(value));
		} else if (Integer.class.equals(type)) {
			hsql.setParameter(FIELD_VALUE, Integer.valueOf(value));
		} else {
			hsql.setParameter(FIELD_VALUE, value != null ? value.trim().toLowerCase() : null);
		}
		List<T> list = hsql.getResultList();
		return (list != null && !list.isEmpty()) ? list.get(0) : null;
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	public List<T> findAllByField(Class<T> t, String field, String value, Class<?> fieldClass) {
		String sQuery = SELECT_O_FROM + t.getSimpleName() + " o where ";
		if (fieldClass.equals(String.class)) {
			sQuery += " lower(o." + field + ") ";
		} else {
			sQuery += " o." + field;
		}
		sQuery += "= :fieldValue ";
		Query hsql = this.em.createQuery(sQuery);
		if (fieldClass.equals(String.class)) {
			hsql.setParameter(FIELD_VALUE, value != null ? value.trim().toLowerCase() : null);
		} else {
			Object otherValue = constructObjectFromString(fieldClass, value);
			hsql.setParameter(FIELD_VALUE, otherValue);
		}
		return hsql.getResultList();
	}

	private Object constructObjectFromString(Class<?> fieldClass, String value) {
		try {
			return fieldClass.getDeclaredMethod("valueOf", new Class[] { String.class }).invoke(null, value);
		} catch (Exception e) {
			throw new RuntimeException("Cannot convert object " + fieldClass + " to string", e);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<T> findAllByField(Class<T> t, String field, List value, String operation) {
		String sQuery = SELECT_O_FROM + t.getSimpleName() + " o where o." + field + " " + operation + " (:fieldValue)";
		Query hsql = this.em.createQuery(sQuery);
		hsql.setParameter(FIELD_VALUE, value);
		return hsql.getResultList();
	}

	/**
	 * {@inheritDoc}
	 */
	public List<T> findAll(Class<T> type) {
		return this.em.createQuery("FROM " + type.getName(), type).getResultList();
	}

	/**
	 * {@inheritDoc}
	 */
	public void delete(T obj) {
		this.em.remove(obj);
	}

	/**
	 * {@inheritDoc}
	 */
	public void delete(Collection<T> objs) {
		if (objs != null) {
			Iterator<T> iter = objs.iterator();
			while (iter.hasNext()) {
				delete(iter.next());
			}
		}
	}

	/**
	 * {@inheritDoc}
	 */
	public T update(T t) {
		return this.em.merge(t);
	}

	/**
	 * {@inheritDoc}
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByLikeField(Class<T> t, String field, String value) {
		String sQuery = SELECT_O_FROM + t.getSimpleName() + " o where lower(o." + field + ") like :fieldValue";
		Query hsql = this.em.createQuery(sQuery);
		hsql.setParameter(FIELD_VALUE, value != null ? value.trim().toLowerCase() : null);
		return hsql.getResultList();
	}

	/**
	 * {@inheritDoc}
	 */
	public BigInteger generateIdFromSequencer(String sequencerName) {
		BigInteger fid = null;
		String sqlQuery = "SELECT nextval('" + sequencerName + "')";
		Query hsql = this.em.createNativeQuery(sqlQuery);
		fid = (BigInteger) hsql.getSingleResult();
		LOG.debug("generateIdFromSequencer " + fid);
		return fid;
	}

	/**
	 * {@inheritDoc}
	 */
	public int count(Class<T> t) {
		return ((Number) this.em.createQuery("SELECT COUNT(o) FROM " + t.getSimpleName() + " o").getSingleResult())
				.intValue();
	}

	// ----------------SEARCH-PAGING mechanism---------
	/**
	 * @param targetClass
	 * @return
	 */
	private Constructor<T> getObjectArrayConstructor(final Class<T> targetClass) {
		Constructor<T> obConstructor = null;
		try {
			obConstructor = targetClass.getConstructor(new Class<?>[] { Object[].class });
		} catch (NoSuchMethodException e) {
			LOG.debug(" NoSuchMethodException: " + e.getMessage(), e);
		} catch (SecurityException e) {
			LOG.debug(" SecurityException: " + e.getMessage(), e);
		}
		LOG.debug(" obConstructor: " + obConstructor);

		return obConstructor;
	}

	public List<T> executeNamedStoredProcedureQueryWithParameters(String queryName,
			LinkedHashMap<String, Object> parameters) {

		StoredProcedureQuery q = em.createNamedStoredProcedureQuery(queryName);

		for (String key : parameters.keySet()) {
			q.setParameter(key, parameters.get(key));
		}
		return q.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<T> find(final Class<T> targetClass, String queryName, final Object[] queryArgs) {
		queryName = targetClass.getSimpleName() + "." + queryName;
		final Query namedQuery = em.createNamedQuery(queryName);
		for (int i = 0; i < queryArgs.length; i++) {
			Object arg = queryArgs[i];
			namedQuery.setParameter(i + 1, arg);
		}
		return (List<T>) namedQuery.getResultList();
	}




}