import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Patient} from "../shared/patient.model";
import {PatientService} from "../shared/patient.service";
import {PageableData} from "../../shared/pageable-data.model";
import {UtilityService} from "app/shared/utility.service";
import {NotificationService} from "app/shared/notification.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'c2s-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  private searchTerms = new Subject<string>();
  private totalPages: number = 0;
  public totalItems: number = 0;
  public itemsPerPage: number = 0;
  public currentPage: number = 1;
  public noResult: boolean = false;
  public loading: boolean = false;
  public asyncPatients: Observable<Patient[]>;
  public searchPatients: Patient[];

  constructor(private notificationService: NotificationService,
              private patientService: PatientService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
    // Avoid to send too many API calls
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.patientService.searchPatients(term))
      .subscribe(
        (patients) => {
          this.searchPatients = patients;
        },
        err => {
          this.notificationService.show("Failed to search user, please try again later...");
          console.log(err);
        });
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public getPage(page: number) {
    this.loading = true;
    this.asyncPatients = this.patientService.getPatients(page - 1)
      .do((patients: PageableData<Patient>) => {
        this.noResult = patients.totalElements === 0;
        this.totalItems = patients.totalElements;
        this.totalPages = patients.totalPages;
        this.itemsPerPage = patients.size;
        this.currentPage = patients.number + 1;
        this.loading = false;
      })
      .map(patients => patients.content);
  }

  public redirectToUserEdit(patient: Patient) {
    const editUserUrl: string = `${"/users/edit"}/${patient.id}`;
    this.utilityService.navigateTo(editUserUrl)
  }
}
