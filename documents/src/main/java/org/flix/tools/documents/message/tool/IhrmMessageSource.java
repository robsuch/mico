package org.flix.tools.documents.message.tool;

import java.text.MessageFormat;
import java.util.Locale;

import javax.transaction.Transactional;

import org.flix.tools.documents.dao.LabelDAO;
import org.flix.tools.documents.dao.impl.LabelDAOImpl;
import org.flix.tools.documents.model.Label;
import org.flix.tools.documents.web.controller.MainController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.AbstractMessageSource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;


public class IhrmMessageSource extends ReloadableResourceBundleMessageSource{//AbstractMessageSource {
	private static final Logger LOG = LoggerFactory.getLogger(IhrmMessageSource.class);
	@Autowired
	private LabelDAO labelDAO;
	
	@Value("#{applicationProperties['db.datasource']}")
	private String dBdatasource;
	

	@Override
	@Transactional
	protected MessageFormat resolveCode(String code, Locale locale) {
		LOG.info(dBdatasource);
		MessageFormat format;
		MyObj myObj = new MyObj();
		Label label = labelDAO.findLabelByCode(code);
		myObj.setId(label.getId());
        myObj.setValue(label.getLabelValue());
		if (myObj!= null && myObj.getId() != null) {
			format = new MessageFormat(myObj.getValue(), locale);			
		}
		else {

            format = super.resolveCode(code, locale);

        }

		return format;
	}
	
    protected String resolveCodeWithoutArguments(String code, Locale locale) {
		MyObj myObj = new MyObj();
		Label label = labelDAO.findLabelByCode(code);
		myObj.setId(label.getId());
        myObj.setValue(label.getLabelValue());
        
        String format;

        if (myObj != null && myObj.getId() != null) {

            format = myObj.getValue();

        } else {

            format = super.resolveCodeWithoutArguments(code, locale);

        }

        return format;

    }
	
	private class MyObj{
		
		private Integer id;
		
		private String value;

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}
	}

}
