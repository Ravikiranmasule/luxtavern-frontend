import { Component, OnInit } from '@angular/core';
import { HotelChain } from '../models/hotel-chain.model';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotelchainedit',
  templateUrl: './hotelchainedit.component.html',
  styleUrls: ['./hotelchainedit.component.css']
})
export class HotelchaineditComponent implements OnInit {
  chain: HotelChain = { id: 0, name: '', headquarters: '' }; // Initialize with default values
  isEditing = false;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const chainId = this.route.snapshot.paramMap.get('id');
    if (chainId) {
      this.isEditing = true;
      this.hotelService.getHotelChainById(+chainId).subscribe(chain => {
        this.chain = chain;
      }, error => {
        console.error('Error fetching hotel chain details', error);
      });
    }
  }

  saveChain(): void {
    if (this.isEditing) {
      this.hotelService.updateHotelChain(this.chain.id, this.chain).subscribe(() => {
        alert('Hotel chain updated successfully');
        this.router.navigate(['/hotel-chain-list']);
      }, error => {
        console.error('Error updating hotel chain', error);
      });
    } else {
      this.hotelService.addHotelChain(this.chain).subscribe(() => {
        alert('Hotel chain added successfully');
        this.router.navigate(['/hotel-chain-list']);
      }, error => {
        console.error('Error adding hotel chain', error);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/hotel-chain-list']);
  }

  

}
