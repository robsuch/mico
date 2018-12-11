package org.flix.tools.documents.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity(name="Label")
//@Table(name = "APPS.XXHR_SEARCH_PEOPLE_V")
@Table(name = "LABEL")
public class Label implements java.io.Serializable {

	private static final long serialVersionUID = 8765016103450361311L;

	@Column(name = "id")
	private Integer Id;
	
	@Column(name = "labal_code")
	private String labelCode;
	
	@Column(name = "label_value")
	private String labelValue;
		
	@Column(name = "label_language")
	private String labelLanguage;

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getLabelCode() {
		return labelCode;
	}

	public void setLabelCode(String labelCode) {
		this.labelCode = labelCode;
	}

	public String getLabelValue() {
		return labelValue;
	}

	public void setLabelValue(String labelValue) {
		this.labelValue = labelValue;
	}

	public String getLabelLanguage() {
		return labelLanguage;
	}

	public void setLabelLanguage(String labelLanguage) {
		this.labelLanguage = labelLanguage;
	}  
	
	
	
}
