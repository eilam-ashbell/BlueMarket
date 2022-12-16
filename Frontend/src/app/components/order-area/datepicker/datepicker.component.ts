import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.model';
import { UtilsService } from 'src/app/services/utils.service';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

    public minDate: Date;
    public busyDates: OrderModel[];

    filterBusyDates = (d: Date): boolean => {
        const time = d?.getTime()
        const filterDates = this.busyDates?.map( d => new Date(d._id).setHours(0))
        if ( d.getDay() === 6 ) return false
        return !filterDates?.find( x => x == time)
      }

    //   todo - costume validator for date typing
    //   todo - delete if not working
      dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
        // Only highligh dates inside the month view.
        if (view === 'month') {
          const date = cellDate.getDate();
          // Highlight the 1st and 20th day of each month.
          return (date === 1 || date === 20) ? 'custom-date-class' : '';
        }
    
        return '';
      }

  constructor(private utilsService: UtilsService) { }

  async ngOnInit(): Promise<void> {
        this.busyDates = await this.utilsService.getBusyDates()
        this.minDate = new Date()
  }

}
