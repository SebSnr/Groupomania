export const RemoveBtnFocusOutline = () => {
	// remove focus around button when after click 
	document.addEventListener("click", function (e) {
		if (document.activeElement.toString() === "[object HTMLButtonElement]") {
			document.activeElement.blur()
		}
	})
}
