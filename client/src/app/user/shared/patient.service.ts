import {Injectable} from "@angular/core";
import {ExceptionService} from "../../shared/exception.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {PageableData} from "../../shared/pageable-data.model";
import {Patient} from "./patient.model";

@Injectable()
export class PatientService {

  constructor(private exceptionService: ExceptionService,
              private http: Http) {
  }

  getPatients(page: number): Observable<PageableData<Patient>> {
    //Todo: Change to api url
    const resourceUrl = "./assets/api/patients.json";
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    return this.http.get(resourceUrl, {search: params})
      .map((resp: Response) => <PageableData<Patient>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
