package org.flix.tools.documents.dao;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/*import eu.europa.europarl.apapeople.common.persistence.PagingData;
import eu.europa.europarl.apapeople.common.persistence.QueryFilter;
import eu.europa.europarl.apapeople.common.persistence.QueryList;
import eu.europa.europarl.apapeople.model.util.QueryResultValue;
*/
/**
 * DAO class responsible for inheritable DB operations.
 * 
 * @author ED
 * 
 */
public interface GenericDAO<T, ID extends Serializable> {
	/**
	 * <p>
	 * create.
	 * </p>
	 * 
	 * @param t
	 *            a T object.
	 */
	T create(T t);

	/**
	 * 
	 * @param t
	 * 
	 * @param flushOperation
	 * 
	 * @return
	 */
	T create(T t, boolean flushOperation);

	boolean exists(Class<T> type, ID id);

	/**
	 * Performs flush() so that pending DB operations are executed immediately.
	 * 
	 * @return
	 */
	boolean doFlush();

	/**
	 * <p>
	 * find.
	 * </p>
	 * 
	 * @param type
	 *            a {@link java.lang.Class} object.
	 * 
	 * @param id
	 *            a ID object.
	 * 
	 * @return a T object.
	 */
	T find(Class<T> type, ID id);

	/**
	 * Finds an entity given the name and the value of a specific property.
	 * 
	 * @param t
	 * 
	 * @param field
	 * 
	 * @param value
	 * 
	 * @param type
	 * 
	 * @return
	 */
	T findByField(Class<T> t, String field, String value, Class<?> type);

	/**
	 * Populates the list of all entities of a given type.
	 * 
	 * @param type
	 * 
	 * @return
	 */
	List<T> findAll(Class<T> type);

	/**
	 * Finds the list of all objects of an entity given the name and the value of a specific property.
	 * 
	 * @param t
	 * 
	 * @param field
	 * 
	 * @param value
	 * 
	 * @param fieldClass
	 * 
	 * @return
	 */
	List<T> findAllByField(Class<T> t, String field, String value, Class<?> fieldClass);

	/**
	 * Finds the list of all objects of an entity given the name and the list of values of a specific property.
	 * 
	 * @param t
	 * @param field
	 * @param value
	 * @param operation
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	List<T> findAllByField(Class<T> t, String field, List value, String operation);

	/**
	 * <p>
	 * update.
	 * </p>
	 * 
	 * @param t
	 *            a T object.
	 */
	T update(T t);

	/**
	 * <p>
	 * delete.
	 * </p>
	 * 
	 * @param obj
	 *            a T object.
	 */
	void delete(T obj);

	/**
	 * Deletes a Collection of objects.
	 * 
	 * @param objs
	 */
	void delete(Collection<T> objs);

	/**
	 * 
	 * @param t
	 * 
	 * @return
	 */
	int count(Class<T> t);

	/**
	 * 
	 * @param t
	 * @param field
	 * @param value
	 * @return
	 */
	List<T> findByLikeField(Class<T> t, String field, String value);

	/**
	 * Generates the next identifier provided the name of a DB sequencer.
	 * 
	 * @param sequencerName
	 * 
	 * @return
	 */
	BigInteger generateIdFromSequencer(String sequencerName);

	// ----------------SEARCH-PAGING mechanism---------
	
	/**
	 * xecute a stored proc with param and security
	 * 
	 * @param queryName
	 * @param parameters
	 * @return
	 */
	List<T> executeNamedStoredProcedureQueryWithParameters(String queryName,
			LinkedHashMap<String, Object> parameters);
	
	/**
	 * Execute a named query defined in a Model object
	 * 
	 * @param queryName
	 * @param queryArgs
	 * @return List of Model objects
	 */
	public List<T> find(final Class<T> t, String queryName, final Object[] queryArgs);
		
}