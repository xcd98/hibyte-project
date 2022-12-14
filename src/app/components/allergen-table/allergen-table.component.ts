import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Allergen } from "src/app/data-model/allergen.model";
import { AllergenService } from "../../services/allergen.service";

@Component({
  selector: "app-allergen-table",
  templateUrl: "./allergen-table.component.html",
  styleUrls: ["./allergen-table.component.css"],
})
export class AllergenTableComponent implements OnInit {
  allergens: Allergen[] = [];

  addAllergenForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
  });

  displayPopup: boolean;

  constructor(private allergenService: AllergenService) {}

  ngOnInit() {
    this.getAllergens();
  }

  showPopup() {
    this.displayPopup = true;
  }

  getAllergens() {
    this.allergenService.fetchAllergens().subscribe((allergens) => {
      this.allergens = allergens;
    });
  }

  addAllergen() {
    let newAllergen: Allergen = { name: this.addAllergenForm.value.name };
    this.allergenService.addNewAllergen(newAllergen).subscribe(() => {
      this.displayPopup = false;
      this.getAllergens();
    });

    this.addAllergenForm.reset();
  }
}
