// JavaScript to toggle the "active" class for the hamburger menu
// document.querySelector('.hamburger').addEventListener('click', function() {
//     this.classList.toggle('active');
// });
// JavaScript to toggle the menu when the hamburger icon is clicked
document.getElementById('hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('menu').classList.toggle('active');
});

function validateForm() {
    const fields = [
        "childName",
        "childdob",
        "childAge", 
        "placeofoccurance",
        "villageTown",
        "parent1Name", 
        "residence",
        "motherAge",
        "maritialStatus",
        "nationality",
        "stateOforigin",
        "Occupation",
        "contact",
        "nationalID",
        "parent2Name",
        "fatherAge",
        "informatName",
        "relation",
        "Ageofanyparent"

    ];
    const isValid = true;

    function checkEmptyFields() {
        for (const i = 0; i < fields.length; i++) {
          const fieldValue = document.getElementById(fields[i]).value;
          if (fieldValue === "") {
            return false;
          }
        }
        return true;
      }

      if (!checkEmptyFields()) {
        alert("Please complete all details before submitting.");
        isValid = false;
      }

      const childAge = document.getElementById("childAge").value;
      const contact = document.getElementById("contact").value;
      const nationalID = document.getElementById("nationalID").value;
      if (isNaN(childAge, contact, nationalID)) {
        alert("Please enter a valid number for the child's age.");
        isValid = false;
      }


      const gender = document.querySelector('input[name="gender"]:checked');
      if (!gender) {
        alert("Please select a gender before submitting.");
        isValid = false;
      }

      return isValid;
    }