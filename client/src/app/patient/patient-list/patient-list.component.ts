import {Component, OnInit} from "@angular/core";
import {PageableData} from "../../shared/pageable-data.model";
import {Patient} from "../shared/patient.model";
import {Observable} from "rxjs";
import {PatientService} from "../shared/patient.service";

@Component({
  selector: 'c2s-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  private totalItems: number = 0;
  private totalPages: number = 0;
  private itemsPerPage: number = 0;
  private currentPage: number = 1;
  private loading: boolean = false;

  private asyncPatients: Observable<Patient[]>;

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncPatients = this.patientService.getPatients(page - 1)
      .do((patients: PageableData<Patient>) => {
        this.totalItems = patients.totalElements;
        this.totalPages = patients.totalPages;
        this.itemsPerPage = patients.size;
        this.currentPage = patients.number + 1;
        this.loading = false;
      })
      .map(patients => patients.content);
  }
}
