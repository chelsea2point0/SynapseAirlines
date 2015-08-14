// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal, initialLocation) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
    self.location = ko.observable(initialLocation);

    self.formattedPrice = ko.computed(function() {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "Complementary";        
    });    
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Vegetarian (salad)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    self.availableLocations = [
        { seatType: "Aisle"},
        { seatType: "Middle"},
        { seatType: "Window"}
    ];

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Jane Doe", self.availableMeals[2], self.availableLocations[2]),
        new SeatReservation("John Doe", self.availableMeals[3], self.availableLocations[0])
    ]);

    // Computed data
    self.totalSurcharge = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.seats().length; i++)
           total += self.seats()[i].meal().price;
       return total;
    });    

    // Operations
    self.addSeat = function() {
        self.seats.push(new SeatReservation("", self.availableMeals[0], self.availableLocations[0]));
    }
    self.removeSeat = function(seat) { self.seats.remove(seat) }
}

$(document).ready(function() {
    ko.applyBindings(new ReservationsViewModel());
});