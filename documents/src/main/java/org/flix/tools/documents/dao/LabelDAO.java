package org.flix.tools.documents.dao;

import org.flix.tools.documents.model.Label;

public interface LabelDAO extends GenericDAO<Label, Integer> {
  Label findLabelByCode(String code);
}
