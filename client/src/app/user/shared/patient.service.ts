import {Injectable} from "@angular/core";
import {ExceptionService} from "../../shared/exception.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {PageableData} from "../../shared/pageable-data.model";
import {Patient} from "./patient.model";
import {ApiUrlService} from "app/shared/api-url.service";

@Injectable()
export class PatientService {
  private umsPatientUrl: string = this.apiUrlService.getUmsBaseUrl().concat("/patients");

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getPatients(page: number): Observable<PageableData<Patient>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    return this.http.get(this.umsPatientUrl, {search: params})
      .map((resp: Response) => <PageableData<Patient>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public searchPatients(terms: string): Observable<Patient[]> {
    const SEARCH_PATIENT_URL = `${this.umsPatientUrl.concat("/search")}/${terms}`;
    return this.http.get(SEARCH_PATIENT_URL)
      .map((resp: Response) => <Patient[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
