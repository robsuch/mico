package org.flix.tools.documents.dao.impl;


import java.util.List;

import org.flix.tools.documents.dao.LabelDAO;
import org.flix.tools.documents.model.Label;
import org.springframework.stereotype.Repository;

@Repository
public class LabelDAOImpl extends GenericDAOImpl<Label, Integer> implements LabelDAO {
	

	private static final String CODE = "code";

	public Label findLabelByCode(String code) {
        Label result = null;
		String query = "SELECT label FROM Label AS label  WHERE label_code = :code";
				
		List <Label> labels = this.em.createQuery(query, Label.class).setParameter(CODE, code).getResultList();//setFirstResult(0).setMaxResults(1);//.getSingleResult();
		for (Label labellocal : labels) {
			result = labellocal;
		}
		return  result;		

	}
	
	

}
