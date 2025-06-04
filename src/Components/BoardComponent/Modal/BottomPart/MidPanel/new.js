const form = document.getElementById('myForm');
const submitBtn = document.getElementById('btnSave');


// Example object, assign to a variable if needed:
const exampleFields = {
    "field_xmynu3": "value1",
    "field_4g2j3k": "value2",
    "field_123456": "value3",
};

// Listen for the form's submit event
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Collect form data
  const formData = new FormData(form);
  const details = Object.fromEntries(formData.entries());

  const customEvent = new CustomEvent('myFormSubmitEvent', {
    detail: { data: details }, 
    bubbles: true 
  });

  submitBtn.dispatchEvent(customEvent);
});



 submitBtn.addEventListener('formSubmitEvent', function(e) {
  for(let value in e.detail) {
    console.log(value)
  }
});

   <div class="panel-body">
						<div class="adv-table">
							<table  class="display table table-bordered table-striped" id="dynamic-table">
						<thead>
						<tr>
							
							<th>Course Code</th>
							
							<th class="center">Course Credit</th>
							
							<th class="center">Level-Term</th>
							<th class="center">Sessional</th>
							<th class="center">Result</th>
							<th class="center">Course type</th>
						
						</tr>
						</thead>
						<tbody>
								
						<tr class="gradeA productall_row">
						
							<td>HUM 125</td>
						
							<td>2.0</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>No</td>
							<td>B</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>CHEM 117</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 111</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>No</td>
							<td>D</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 181</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>No</td>
							<td>B</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Math 111</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>No</td>
							<td>D</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Arch 106</td>
						
							<td>1.5</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>Yes</td>
							<td>C</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Hum 172</td>
						
							<td>1.5</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>Yes</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 152</td>
						
							<td>1.5</td>
							
							<td>Level 1 - Term 1</td>
							
							<td>Yes</td>
							<td>B-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Arch 145</td>
						
							<td>2.0</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>No</td>
							<td>D</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 171</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>No</td>
							<td>B+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 113</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 183</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>No</td>
							<td>B</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Hum 171</td>
						
							<td>3.0</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>No</td>
							<td>B-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 154</td>
						
							<td>1.5</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>Yes</td>
							<td>A+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 172</td>
						
							<td>1.0</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>Yes</td>
							<td>A+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 176</td>
						
							<td>1.5</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>Yes</td>
							<td>B+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Arch 116</td>
						
							<td>1.5</td>
							
							<td>Level 1 - Term 2</td>
							
							<td>Yes</td>
							<td>C</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>CE 209</td>
						
							<td>2.0</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>No</td>
							<td>B</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 219</td>
						
							<td>3.0</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>No</td>
							<td>B+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 221</td>
						
							<td>3</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>No</td>
							<td>C</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 261</td>
						
							<td>3</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>No</td>
							<td>B-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Hum 279</td>
						
							<td>2</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>No</td>
							<td>B</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 222</td>
						
							<td>3</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>Yes</td>
							<td>A-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 262</td>
						
							<td>1.5</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>Yes</td>
							<td>A+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 256</td>
						
							<td>1.5</td>
							
							<td>Level 2 - Term 1</td>
							
							<td>Yes</td>
							<td>B+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 215</td>
						
							<td>3.0</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 277</td>
						
							<td>3.0</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>No</td>
							<td>D</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Arch 233</td>
						
							<td>2.0</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>CE 215</td>
						
							<td>2.0</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Phy 225</td>
						
							<td>2.0</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 216</td>
						
							<td>3.0</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>Yes</td>
							<td>A</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>Arch 216</td>
						
							<td>1.5</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>Yes</td>
							<td>B+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>CSE 282</td>
						
							<td>1.5</td>
							
							<td>Level 2 - Term 2</td>
							
							<td>Yes</td>
							<td>A+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>CE 329</td>
						
							<td>3.0</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>No</td>
							<td>D</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 325</td>
						
							<td>3</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>No</td>
							<td>B-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 326</td>
						
							<td>1.5</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>Yes</td>
							<td>A</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 341</td>
						
							<td>3</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>No</td>
							<td>C</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 342</td>
						
							<td>1.5</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>Yes</td>
							<td>A-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 347</td>
						
							<td>3</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>No</td>
							<td>C</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 397</td>
						
							<td>3</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>No</td>
							<td>C</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 306</td>
						
							<td>1</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>Yes</td>
							<td>A</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 366</td>
						
							<td>1.5</td>
							
							<td>Level 3 - Term 1</td>
							
							<td>Yes</td>
							<td>B-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>CE 365</td>
						
							<td>3.00</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 343</td>
						
							<td>3.00</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>No</td>
							<td>F</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 363</td>
						
							<td>3.00</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>CE 359</td>
						
							<td>3.0</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>No</td>
							<td>C+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 317</td>
						
							<td>3.0</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>No</td>
							<td>D</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 318</td>
						
							<td>3.0</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>Yes</td>
							<td>A-</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 344</td>
						
							<td>1.5</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>Yes</td>
							<td>B+</td>
						<td>regular</td>
							
							
						</tr>
								
						<tr class="gradeA productall_row">
						
							<td>URP 364</td>
						
							<td>1.5</td>
							
							<td>Level 3 - Term 2</td>
							
							<td>Yes</td>
							<td>A-</td>
						<td>regular</td>
							
							
						</tr>
												</tfoot>
						</table>
						
					
					                </section>
            </div>
        </div>
