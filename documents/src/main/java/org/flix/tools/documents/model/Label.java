package org.flix.tools.documents.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity(name="Label")
//@Table(name = "APPS.XXHR_SEARCH_PEOPLE_V")
@Table(name = "LABEL")
public class Label implements java.io.Serializable {

	private static final long serialVersionUID = 8765016103450361311L;

	
	private Integer Id;
	

	private String labelCode;
	

	private String labelValue;
		
	private String labelLanguage;

	@Id
	@Column(name = "id")
	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}
	@Column(name = "label_code" , insertable = false, updatable = false)
	public String getLabelCode() {
		return labelCode;
	}

	public void setLabelCode(String labelCode) {
		this.labelCode = labelCode;
	}

	@Column(name = "label_value",  insertable = false, updatable = false)
	public String getLabelValue() {
		return labelValue;
	}

	public void setLabelValue(String labelValue) {
		this.labelValue = labelValue;
	}

	@Column(name = "label_language")
	public String getLabelLanguage() {
		return labelLanguage;
	}

	public void setLabelLanguage(String labelLanguage) {
		this.labelLanguage = labelLanguage;
	}  
	
	
	
}
