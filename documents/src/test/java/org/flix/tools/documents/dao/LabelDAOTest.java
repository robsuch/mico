package org.flix.tools.documents.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.flix.tools.documents.model.Label;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;



//@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext-test.xml" })
public class LabelDAOTest extends AbstractTransactionalJUnit4SpringContextTests {
	
	@Autowired
	private LabelDAO labelDAO;
	
	
	@Test
	@Transactional
	public void testGetLabel() {
		Label label = labelDAO.findLabelByCode("label.questionnaire");
		assertNotNull(label);
		assertEquals("from DB2", label.getLabelValue());
	}

}
