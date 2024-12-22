// Checking data for weight and height

document.addEventListener("DOMContentLoaded", function () {
  const weightInput = document.getElementById("person-weight");
  const heightInput = document.getElementById("person-height");
  const calculateButton = document.getElementById("calculate-button");
  // calculateButton.value = "New Calculate";
  const resetButton = document.getElementById("reset-button");
  const bmiResultScore = document.getElementById("BMI-result-score");
  const bmiResultConclusion = document.querySelector(".BMI-result-conclusion");
  const bmiResultContainer = document.getElementById("result-container");

  weightInput.addEventListener("input", limitInput);
  heightInput.addEventListener("input", limitInput);

    calculateButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (validateWeight() && validateHeight()) {
    calculateBMI();
    const targetDiv = document.getElementById("result-container");
    if (targetDiv) {
      targetDiv.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});

  resetButton.addEventListener("click", function (event) {
    event.preventDefault();
    resetInputs();
  });

  // Smooth transition for anchor links and data reset when New Calculation button is pressed

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({
        behavior: "smooth",
      });
      resetInputs();
    });
  });

  function limitInput(event) {
    event.target.value = event.target.value
      .replace(/^0|[^0-9]/g, "")
      .slice(0, 3);
  }

  function validateWeight() {
    const value = weightInput.value;
    if (!/^[1-9]\d*$/.test(value) || value > 200) {
      weightInput.setCustomValidity("Enter a whole number between 1 and 200");
      weightInput.reportValidity();
      return false;
    } else {
      weightInput.setCustomValidity("");
      weightInput.reportValidity();
      return true;
    }
  }

  function validateHeight() {
    const value = heightInput.value;
    if (!/^[1-9]\d*$/.test(value) || value > 200) {
      heightInput.setCustomValidity("Enter a whole number between 1 and 200");
      heightInput.reportValidity();
      return false;
    } else {
      heightInput.setCustomValidity("");
      heightInput.reportValidity();
      return true;
    }
  }

  // BMI calculation
  function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value) / 100;
    const bmi = weight / (height * height);
    console.log(`Your BMI is: ${bmi.toFixed(2)}`);
    bmiResultScore.textContent = bmi.toFixed(2);

    bmiResultConclusion.textContent = "";

    if (bmi < 18.5) {
      bmiResultConclusion.textContent =
        "If your BMI is below 18.5, you are considered underweight. It's important to consult a healthcare professional to understand the reasons behind being underweight and develop a plan to achieve a healthier weight. Focus on eating a balanced diet rich in nutrient-dense foods like lean proteins, whole grains, and healthy fats. Gradually increasing your caloric intake and including resistance exercises can also help promote muscle gain.";
      bmiResultContainer.style.backgroundColor = "var(--resultBadBgColor)";
    } else if (bmi >= 18.5 && bmi <= 24.99) {
      bmiResultConclusion.textContent =
        "A BMI range of 18.50 to 24.99 is considered a 'healthy weight'. Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.";
      bmiResultContainer.style.backgroundColor = "var(--resultGreatBgColor)";
    } else if (bmi >= 25 && bmi < 30) {
      bmiResultConclusion.textContent =
        "If your BMI falls between 25 and 29.99, you are considered overweight. To reduce your weight, focus on maintaining a calorie deficit by consuming fewer calories than you burn. Opt for a balanced diet with more vegetables, fruits, lean proteins, and whole grains while minimizing high-calorie processed foods. Increase your physical activity by incorporating aerobic exercises like brisk walking, cycling, or swimming for at least 30 minutes a day, five days a week.";
      bmiResultContainer.style.backgroundColor = "var(--resultBadBgColor)";
    } else if (bmi >= 30) {
      bmiResultConclusion.textContent =
        "A BMI of 30 or higher is classified as obese. Obesity can increase your risk of developing chronic health issues, such as type 2 diabetes, heart disease, and certain cancers. Work with a healthcare provider to create a weight-loss plan tailored to your needs. Focus on a healthy eating pattern that emphasizes vegetables, fruits, lean proteins, and whole grains. Reducing portion sizes and cutting back on sugary and high-fat foods can also be beneficial. Aim for at least 150 minutes of moderate physical activity each week, including both aerobic exercises and strength training.";
      bmiResultContainer.style.backgroundColor = "var(--resultWorseBgColor)";
    }
  }
  // reset function
  function resetInputs() {
    weightInput.value = "";
    heightInput.value = "";
    bmiResultScore.textContent = "...";
    bmiResultContainer.style.backgroundColor = "var(--mainBlueColor)";
    bmiResultConclusion.textContent =
      "To calculate your BMI, please enter your height in centimeters and your weight in kilograms above";
  }
});
