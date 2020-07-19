import { Component, OnInit } from '@angular/core';
import { GeneralData } from '../../../models/general-data.model';
import { GeneralDataService } from '../../../services/general-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year = new Date().getFullYear();
  data: GeneralData;

  constructor(private dataService: GeneralDataService) { }

  ngOnInit(): void {
    if (localStorage.getItem('generalData')) {
      this.data = this.dataService.readLocalData();
    } else {
      this.getGeneralData();
    }
  }

  getGeneralData() {
    this.dataService.getDataFromDb().subscribe(data => {
      this.data = data;
    });
  }

}
