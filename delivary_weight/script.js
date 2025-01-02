        // Area data based on city
        const areaData = {
            dhaka: ["Mirpur", "Uttara", "Mohammadpur", "Kallyanpur", "Asadgate", "Farmgate", "Collegegate", "Khilkhet", "Newmarket"],
            chandpur: ["Motlob", "Haimchar", "Hajiganj", "Kacua", "Faridganj"]
        };

        // Update areas based on city selection
        function updateAreaOptions() {
            const city = document.getElementById("city").value;
            const areaSelect = document.getElementById("area");

            // Clear previous options
            areaSelect.innerHTML = `<option value="">Select Area</option>`;
            
            // If city is selected, populate area dropdown
            if (city) {
                areaData[city].forEach(area => {
                    const option = document.createElement("option");
                    option.value = area.toLowerCase();
                    option.textContent = area;
                    areaSelect.appendChild(option);
                });
                areaSelect.disabled = false; // Enable area dropdown
            } else {
                areaSelect.disabled = true; // Disable area dropdown if no city selected
            }
        }

        // Convert weight to kg if necessary
        function convertToKg(unit, value) {
            const conversionRates = {
                kg: 1,
                g: 0.001,
                mg: 0.000001,
                lb: 0.453592,
                ml: 0.001,
                l: 1
            };
            return value * (conversionRates[unit] || 1); // Default 1 for kg
        }

        // Calculate delivery charge
        function calculateDeliveryCharge() {
            const productName = document.getElementById("product-name").value;
            const weightValue = parseFloat(document.getElementById("weight-value").value);
            const weightUnit = document.querySelector('input[name="weight-unit"]:checked')?.value;
            const city = document.getElementById("city").value;
            const area = document.getElementById("area").value;

            if (!productName) {
                alert("Please enter the product name!");
                return;
            }
            if (isNaN(weightValue) || weightValue <= 0) {
                alert("Please enter a valid weight!");
                return;
            }
            if (!weightUnit) {
                alert("Please select a weight unit!");
                return;
            }
            if (!city) {
                alert("Please select a city!");
                return;
            }
            if (!area) {
                alert("Please select an area!");
                return;
            }

            // Convert weight to kg
            const weightInKg = convertToKg(weightUnit, weightValue);

            // Charge logic
            let distanceCharge = city === "dhaka" ? 30 : 50; // City-based charge
            const weightCharge = weightInKg * 10; // Per kg charge (10 currency units)
            const totalCharge = distanceCharge + weightCharge;

            // Display result
            document.getElementById("result").textContent = 
                `Product: ${productName}, Total Delivery Charge: ${totalCharge.toFixed(2)} ৳`;
        }