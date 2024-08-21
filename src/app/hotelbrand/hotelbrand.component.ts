import { Component, OnInit } from '@angular/core';
import { HotelBrand } from '../models/hotel-brand.model';
import { HotelService } from '../hotel.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-hotelbrand',
  templateUrl: './hotelbrand.component.html',
  styleUrls: ['./hotelbrand.component.css']
})
export class HotelbrandComponent implements OnInit {

  hotelBrands: HotelBrand[] = [];

  constructor(private hotelService: HotelService,private route:Router) { }

  ngOnInit(): void {
    this.getAllHotelBrands();
  }

  getAllHotelBrands(): void {
    this.hotelService.getAllHotelBrands().subscribe(hotelBrands => {
      this.hotelBrands = hotelBrands;
    }, error => {
      console.error('Error fetching hotel brands', error);
    });
  }
  editBrand(id: number): void {
    this.route.navigate(['/hotel-brand-edit',id])
  }
  deleteBrand(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.hotelService.deleteHotelBrand(id).subscribe(() => {
        alert('Hotel brand deleted');
        this.getAllHotelBrands();
      }, error => {
        console.error('Error deleting hotel brand', error);
      });
    }
  }
}
