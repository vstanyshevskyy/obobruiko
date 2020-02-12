import React from 'react';
import { MdKeyboardArrowRight as RightArrow , MdKeyboardArrowDown as DownArrow } from 'react-icons/md';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import './index.less';

export default ({
  title,
  subtitle,
  items = []
}) => (
  <div className="faq">
    <h3 className="faq__title">{title}</h3>
    <p className="faq__subtitle">{subtitle}</p>
    <Accordion className="faq__accordion" allowMultipleExpanded preExpanded='0'>
      {
        items.map((item, index) => (
          <AccordionItem className="faq__accordion-item" uuid={index}>
            <AccordionItemHeading className="faq__accordion-heading">
              <AccordionItemButton className="faq__accordion-button">
                <RightArrow className="faq__accordion-button-icon" />
                { item.question }
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="faq__accordion-content">
              { item.answer }
            </AccordionItemPanel>
          </AccordionItem>
        ))
      }
    </Accordion>
  </div>
);
