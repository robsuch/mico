package org.flix.tools.documents.dao.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

/**
 * Generic DAO implementation.
 * 
 * @author ED
 */
@Repository
public abstract class AbstractGenericDAOImpl {
	
	//(name = "#{applicationProperties.db.datasource}")
	
	@PersistenceContext
	protected EntityManager em;

	/**
	 * @return
	 */
	public boolean doFlush() {
		this.em.flush();
		return true;
	}

	/**
	 * Returns the current session from the <code>EntityManager</code>.
	 * 
	 * @return current Hibernate session
	 */
	protected Session getSession() {
		return em.unwrap(Session.class);
	}
}