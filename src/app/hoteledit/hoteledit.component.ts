import { Component, OnInit } from '@angular/core';
import { HotelPayload } from '../models/HotelPayload.model';
import { Hotel } from '../models/hotel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hoteledit',
  templateUrl: './hoteledit.component.html',
  styleUrls: ['./hoteledit.component.css']
})
export class HoteleditComponent implements OnInit {

  hotel: Hotel | undefined;
  hotelPayload: HotelPayload = {
    name: '',
    address: '',
    chainId: 0,
    brandId: 0,
    rating: 0
  };
  
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const hotelId = +this.route.snapshot.paramMap.get('id')!;
    this.hotelService.getHotelById(hotelId).subscribe(hotel => {
      this.hotel = hotel;
      this.hotelPayload = {
        name: hotel.name,
        address: hotel.address,
        chainId: hotel.chain.id,
        brandId: hotel.brand.id,
        rating: hotel.starRating
      };
    }, error => {
      console.error('Error fetching hotel details', error);
    });
  }

  updateHotel(): void {
    if (this.hotel) {
      const updatedHotel: HotelPayload = this.hotelPayload;

      this.hotelService.updateHotel(this.hotel.id, updatedHotel).subscribe(() => {
        alert('Hotel updated successfully');
        this.router.navigate(['/manager-dashboard']);
      }, error => {
        console.error('Error updating hotel', error);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/manager-dashboard']);
  }

}
