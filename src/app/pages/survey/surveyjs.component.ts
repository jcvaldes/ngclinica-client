import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';
import * as Survey from 'survey-angular';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../auth/auth.service';
import { validRoles } from '../../utils/enums';
import { PatientSurveyService } from '../survey/survey-patient';
import { ProfessionalSurveyService } from '../survey/survey-professional';

@Component({
  selector: 'surveyjs-component',
  template: `<div id="surveyContainer"></div>`
})
export class SurveyjsComponent implements OnInit {
  editor: SurveyEditor.SurveyEditor;
  survey: any;
  constructor(private authService: AuthService) {
    if (authService.user.role === validRoles.Patient) {
      this.survey = new PatientSurveyService();
    }
    if (authService.user.role === validRoles.Professional) {
      this.survey = new ProfessionalSurveyService();
    }
  }

  ngOnInit() {
    Survey
      .StylesManager
      .applyTheme('modern');
    this.survey.getSurvey().then(data => {
      const survey = new Survey.Model(data);
      survey.onComplete.add(sendDataToServer);
      Survey.SurveyNG.render('surveyContainer', { model: survey });
    });
  }
}

function sendDataToServer(survey) {
  // send Ajax request to your web server.
  alert('The results are:' + JSON.stringify(survey.data));
}
