package org.flix.tools.documents.web.controller;


import java.util.List;
import java.util.Locale;

import org.flix.tools.documents.dao.impl.GenericDAOImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;



@Controller
public class MainController {
	private static final Logger LOG = LoggerFactory.getLogger(MainController.class);

	
	@RequestMapping("/")
	public ModelAndView mainCall() {
		LOG.info("MainController mapping /");
		ModelAndView mav = new ModelAndView("main");
		return mav;
	}
	
	@RequestMapping("/loadlist")
	public ModelAndView loadList() {
		ModelAndView mav = new ModelAndView("doclist");
		DocFields docFields = getFileFields(50);
		mav.addObject("documentName", docFields.getFileName());
		mav.addObject("fileId", docFields.getFileId());
		
		return mav;
	}
	private DocFields getFileFields(Integer dossierId) {
		DocFields docFields =new DocFields();
		docFields.setFileName("testing.txt");
		docFields.setFileId(50);
		return docFields;
	}
	
	
	
	
	/*private List<String> prepareEntitlementsAdditionalDocumentsRequestedNames(Integer dossierId, Locale locale) {
		List<DossierDocumentGroup> dossierDocumentGroups = dossierDocumentGroupService.findFullDossierDocumentGroupsWithSubmittedDocumentsByDossierIdAndProcess(dossierId, Process.ENTITLEMENTS);
		List<String> extraRequestedDocuments = new ArrayList<String>();
		DocFields docFields =new DocFields();
		if (dossierDocumentGroups != null) {
			for (DossierDocumentGroup ddg : dossierDocumentGroups) {
					String documentGroupName = messageSource.getMessage(ddg.getType().getLabel(), null, locale);

					if (ddg.getDossierDocumentGroupDocuments() != null) {
						for (DossierDocumentGroupDocument ddgd : ddg.getDossierDocumentGroupDocuments()) {
							if (ddgd.getDocument().getFile() != null && ddgd.getDocument().getFile().getFileName() != null) {
								docFields.setFileName(ddgd.getDocument().getFile().getFileName()); 
								docFields.setFileId(ddgd.getDocument().getFile().getFileId());
							}
							//extraRequestedDocuments.add(documentGroupName);
							
						}
					}
				
			}
		}

		return extraRequestedDocuments;
	}*/
	//----------------
	/*private List<String> prepareEntitlementsAdditionalDocumentsRequestedNames(Integer dossierId, Locale locale) {
		List<DossierDocumentGroup> dossierDocumentGroups = dossierDocumentGroupService.findFullDossierDocumentGroupsWithSubmittedDocumentsByDossierIdAndProcess(dossierId, Process.ENTITLEMENTS);
		List<String> extraRequestedDocuments = new ArrayList<String>();

		if (dossierDocumentGroups != null) {
			for (DossierDocumentGroup ddg : dossierDocumentGroups) {
				if (DossierDocumentGroupType.getEntitlementsTypes().contains(ddg.getType())) {
					String documentGroupName = messageSource.getMessage(ddg.getType().getLabel(), null, locale);

					if (ddg.getDossierDocumentGroupDocuments() != null) {
						for (DossierDocumentGroupDocument ddgd : ddg.getDossierDocumentGroupDocuments()) {
							if (ddgd.getDocument().getStatus().equals(DossierDocumentStatusType.EXTRA_REQUESTED)) {
								extraRequestedDocuments.add(documentGroupName);
							}
						}
					}
				}
			}
		}

		return extraRequestedDocuments;
	}*/	
//if (ddgd.getDocument().getFile() != null && ddgd.getDocument().getFile().getFileName() != null
	//	Integer extraRequestedEntitlementsDocumentsSize = additionalEntitlementsDocumentNames.size();
	//	dossierContext.put(getVelocityTemplateVariableName(EXTRA_REQUESTED_ENTITLEMENTS_DOCUMENTS_SIZE), extraRequestedEntitlementsDocumentsSize);
	//----------------
	/*
	 					if (DossierDocumentStatusType.REJECTED.equals(ddgd.getDocument().getStatus())) {
						StringBuilder rejectedDocumentInfoBuffer = new StringBuilder("");
						if (ddgd.getDocument().getIsAlreadyProvided()) {
							String documentGroupName = messageSource.getMessage(ddg.getType().getLabel(), null, locale);
							rejectedDocumentInfoBuffer.append(documentGroupName);
						} else {
							rejectedDocumentInfoBuffer.append(documentDisplayName);
							if (ddgd.getDocument().getFile() != null && ddgd.getDocument().getFile().getFileName() != null && !documentDisplayName.equals(ddgd.getDocument().getFile().getFileName())) {
								rejectedDocumentInfoBuffer.append(" - ");
								rejectedDocumentInfoBuffer.append(ddgd.getDocument().getFile().getFileName());
							}
						}
						if (ddgd.getDocument().getReasonForRejection() != null) {
							ddgd.getDocument().getReasonForRejection().translate(locale.getLanguage());
							rejectedDocumentInfoBuffer.append(" - ");
							rejectedDocumentInfoBuffer.append(ddgd.getDocument().getReasonForRejection().getName());
						}
						if (!StringUtils.isEmptyOrNull(ddgd.getDocument().getRejectionJustification())) {
							rejectedDocumentInfoBuffer.append(" - ");
							rejectedDocumentInfoBuffer.append(ddgd.getDocument().getRejectionJustification());
						}

						rejectedDocumentsInfo.add(rejectedDocumentInfoBuffer.toString());
					}
	 */
	//------------------
	
	
	private class DocFields{
		private String fileName;
		private Integer fileId;
		public Integer getFileId() {
			return fileId;
		}
		public void setFileId(Integer fileId) {
			this.fileId = fileId;
		}
		public String getFileName() {
			return fileName;
		}
		public void setFileName(String fileName) {
			this.fileName = fileName;
		}
	}

}
