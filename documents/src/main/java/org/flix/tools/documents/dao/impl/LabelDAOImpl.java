package org.flix.tools.documents.dao.impl;


import org.flix.tools.documents.dao.LabelDAO;
import org.flix.tools.documents.model.Label;
import org.springframework.stereotype.Repository;

@Repository
public class LabelDAOImpl extends GenericDAOImpl<Label, Integer> implements LabelDAO {
	

	private static final String CODE = "code";

	public Label findLabelByCode(String code) {

		String query = "SELECT dossier FROM Label AS label  WHERE label_code = :code";
				
		return this.em.createQuery(query, Label.class).setParameter(CODE, code).setFirstResult(0).setMaxResults(1).getSingleResult();		

	}
	
	

}
