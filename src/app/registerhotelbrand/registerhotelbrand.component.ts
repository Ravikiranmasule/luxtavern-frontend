import { Component, OnInit } from '@angular/core';
import { HotelBrand } from '../models/hotel-brand.model';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registerhotelbrand',
  templateUrl: './registerhotelbrand.component.html',
  styleUrls: ['./registerhotelbrand.component.css']
})
export class RegisterhotelbrandComponent implements OnInit {

  brand: HotelBrand={id:0,name:" ",description:""};
  isEditing = false;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const brandId = this.route.snapshot.paramMap.get('id');
    if (brandId) {
      this.isEditing = true;
      this.hotelService.getHotelBrandById(+brandId).subscribe(brand => {
        this.brand = brand;
      }, error => {
        console.error('Error fetching hotel brand details', error);
      });
    }
  }

  saveBrand(): void {
    if (this.brand) {
      if (this.isEditing) {
        this.hotelService.updateHotelBrand(this.brand.id, this.brand).subscribe(() => {
          alert('Hotel brand updated successfully');
          this.router.navigate(['/hotel-brand-list']);
        }, error => {
          console.error('Error updating hotel brand', error);
        });
      } else {
        this.hotelService.addHotelBrand(this.brand).subscribe(() => {
          alert('Hotel brand added successfully');
          this.router.navigate(['/hotel-brand-list']);
        }, error => {
          console.error('Error adding hotel brand', error);
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/hotel-brand-list']);
  }
}
