import React from 'react';
import ReactMarkdown from '../../../../components/markdown';
import { useQuestionnaire } from '../../context/QuestionnaireContext';

const getItemId = (sectionTitle, groupTitle, item, index) => (
  `${sectionTitle}-${groupTitle}-${item}-${index}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
);

const SymptomChecklist = ({ checklist }) => {
  const { checkedSymptoms, handleSymptomToggle, resetCheckedSymptoms, language } = useQuestionnaire();
  const totalItems = checklist.sections.reduce(
    (sectionCount, section) => sectionCount + section.groups.reduce(
      (groupCount, group) => groupCount + group.items.length,
      0
    ),
    0
  );
  const selectedCount = Object.values(checkedSymptoms).filter(Boolean).length;
  const resetButtonText = language === 'EN' ? 'Reset checklist' : 'Очистити список';

  return (
    <section className="symptomChecklist no-print">
      {checklist.intro && (
        <div className="symptomChecklist__intro">
          <ReactMarkdown>{checklist.intro}</ReactMarkdown>
        </div>
      )}
      <details className="symptomChecklist__details">
        <summary className="symptomChecklist__summary">
          <span className="symptomChecklist__summary-title">{checklist.title}</span>
          <span className="symptomChecklist__summary-meta">
            {selectedCount}/{totalItems}
          </span>
        </summary>
        <div className="symptomChecklist__content">
          {selectedCount > 0 && (
            <div className="symptomChecklist__actions">
              <button
                type="button"
                className="symptomChecklist__reset"
                onClick={resetCheckedSymptoms}
              >
                {resetButtonText}
              </button>
            </div>
          )}
          {checklist.sections.map(section => (
            <section key={section.title} className="symptomChecklist__section">
              <h2 className="symptomChecklist__section-title">{section.title}</h2>
              <div className="symptomChecklist__groups">
                {section.groups.map(group => (
                  <div key={group.title} className="symptomChecklist__group">
                    <h3 className="symptomChecklist__group-title">{group.title}</h3>
                    {group.subtitle && (
                      <p className="symptomChecklist__group-subtitle">{group.subtitle}</p>
                    )}
                    {group.description && (
                      <p className="symptomChecklist__group-description">{group.description}</p>
                    )}
                    <ul className="symptomChecklist__items">
                      {group.items.map((item, index) => {
                        const itemId = getItemId(section.title, group.title, item, index);

                        return (
                          <li key={itemId} className="symptomChecklist__item">
                            <label htmlFor={itemId} className="symptomChecklist__label">
                              <input
                                id={itemId}
                                type="checkbox"
                                checked={Boolean(checkedSymptoms[itemId])}
                                onChange={() => handleSymptomToggle(itemId)}
                              />
                              <span>{item}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </details>
    </section>
  );
};

export default SymptomChecklist;
