document.URL

 addSideNav(document.getElementsByClassName("addToNav").length);
function addSideNav(num)
{
	var section = [];
	var sideNav = document.createElement("div");
		sideNav.setAttribute("id","sideNav");
	
	var group = [];
	/*Ryno add the very top as a bonus*/
	// group.push(document.createElement("div"));
	// group[0].setAttribute("class","outer");	 
	// setInfoID(group[0], 0);	//Set data-id-info attribute
	// {
	// 	var innerGroup = document.createElement("div");
	// 	innerGroup.setAttribute("class","inner");
	// 	var quickLink = document.createElement("a");
	// 	quickLink.setAttribute("class","quickLink");
	// 	quickLink.setAttribute("href","#top");
	// 	quickLink.appendChild(innerGroup);
	// 	group[0].appendChild(quickLink);
	// 	sideNav.appendChild(addRoundContainer(group[0]));
	// 	sideNav.appendChild(group[0]);
	// }

	section.push()

	/************************************/
	for(var i =0; i<num;i++)
	{
		section[i] = document.getElementsByClassName("addToNav")[i];
		section[i].setAttribute("id","section"+i);
		group[i] = document.createElement("div");
		group[i].setAttribute("class","outer");
		setInfoID(group[i], i + 1);	//Set data-id-info attribute

		var innerGroup = document.createElement("div");
		innerGroup.setAttribute("class","inner");


		var quickLink = document.createElement("a");
		// quickLink.setAttribute("onclick","");
		quickLink.setAttribute("class","quickLink");
		var j = (i+1);
		quickLink.setAttribute("href","#section"+i);


		quickLink.appendChild(innerGroup);

		group[i].appendChild(quickLink);

		/******************************************** */
		sideNav.appendChild(addRoundContainer(group[i]));
		/************************** */

		//sideNav.appendChild(group[i]);
	}
		insertAfter(document.getElementById("navBar"), sideNav);
}

function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

/*
 * 
 *	Stores the index, that will be used to access array with extra information
 * 	Hovering purpose only
 *
*/
function setInfoID(groupElement, id)
{
	groupElement.setAttribute("data-id-info", "" + id);
}

function addRoundContainer(groupElement)
{
	var roundContainer = document.createElement("div");
	roundContainer.appendChild(groupElement);
	roundContainer.classList.add('roundContainer');
	return roundContainer;
}