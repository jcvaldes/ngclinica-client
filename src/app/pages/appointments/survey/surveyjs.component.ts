import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';
import * as Survey from 'survey-angular';

@Component({
  selector: 'surveyjs-component',
  template: `<div id="surveyContainer"></div>`
})
export class SurveyjsComponent {
  editor: SurveyEditor.SurveyEditor;
  ngOnInit() {
    Survey
    .StylesManager
    .applyTheme('modern');

    const json = {
      "pages": [
       {
        "name": "page1",
        "elements": [
         {
           "type": "rating",
           "name": "question1",
           "title": "¿Como Calificarías al Profesional que te atendó?",
           "rateMax": 10,
           "isRequired": true,
         },
         {
          "type": "dropdown",
          "name": "question2",
          "title": "¿El profesional resolvió satisfactoriamente tu problema?",
          "isRequired": true,
          "choices": [
           {
            "value": "1",
            "text": "Sí"
           },
           {
            "value": "2",
            "text": "No"
           }
          ]
         }
        ],
        "title": "Encuesta de Satisfacción al Cliente",
        "description": "Clinica Monllor"
       }
      ]
     };
     const survey = new Survey.Model(json);
     survey.onComplete.add(sendDataToServer);
     Survey.SurveyNG.render("surveyContainer", { model: survey });
  }
}
function sendDataToServer(survey) {
debugger
  //send Ajax request to your web server.
  alert("The results are:" + JSON.stringify(survey.data));
}
