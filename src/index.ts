import "../src/main.css";
import * as yup from "yup";

const brand: HTMLInputElement = document.querySelector("#brand")!;
const name: HTMLInputElement = document.querySelector("#name")!;
const web: HTMLInputElement = document.querySelector("#web")!;
const country: HTMLSelectElement = document.querySelector("#country")!;
const category: HTMLSelectElement = document.querySelector("#category")!;
const form: HTMLFormElement = document.querySelector("form")!;
const invalid1: HTMLDivElement = document.querySelector(".invalid1")!;
const invalid2: HTMLDivElement = document.querySelector(".invalid2")!;
const invalid3: HTMLDivElement = document.querySelector(".invalid3")!;
// const invalid4: HTMLDivElement = document.querySelector(".invalid4")!;
// const invalid5: HTMLDivElement = document.querySelector(".invalid5")!;
const schema = yup.object().shape({
	brand: yup
		.string()
		.matches(/^[A-Za-z\s]+$/)
		.required("Brand is required"),
	name: yup
		.string()
		.matches(/^[A-Za-z\s]+$/)
		.required("Name is required"),
	web: yup.string().url("Invalid website URL").required("Website is required"),
	country: yup.string().required("Country is required"),
	category: yup.string().required("Category is required"),
});

const engRegex = /^[A-Za-z\s]+$/;
form.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = {
		brand: brand.value,
		name: name.value,
		web: web.value,
		country: country.value,
		category: category.value,
	};

	invalid1.innerText = "";
	invalid2.innerText = "";
	invalid3.innerText = "";
	console.log(formData);
	schema
		.validate(formData)
		.then(() => {})
		.catch((error) => {
			if (error.path === "brand" || brand.value === "" || !engRegex.test(brand.value)) {
				brand.style.border = "2px solid red";
				invalid1.innerText = "Please enter only English letters";
			}
			if (error.path === "name" || name.value === "" || !engRegex.test(name.value)) {
				name.style.border = "2px solid red";
				invalid2.innerText = "Please enter only English letters";
			}
			if (error.path === "web" || web.value === "") {
				web.style.border = "2px solid red";
				invalid3.innerText = "Please enter correct (URL-link)";
			}
			console.log(error);
		});
	brand.style.border = "2px solid green";
	name.style.border = "2px solid green";
	web.style.border = "2px solid green";
	country.style.border = "2px solid green";
	category.style.border = "2px solid green";
});
