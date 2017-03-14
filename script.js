var reader; //GLOBAL File Reader object for demo purpose only
var arrayOfObjects = new Array();
var studentGroupsArray = new Array();
//http://www.codereadability.com/constructing-html-with-templates/      GREAT WEBSITE FOR REFERENCE


/**
 * Check for the various File API support.
 */
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true; 
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}
/**
 * Creates new html elements
 */
function test(){
    //declare your variables here before the HTML
    var student_firstname = "Adrian";
    var student_lastname = "Vera";
    var student_email = "agvm95@gmail.com";
    var student_linkedin = "https://www.linkedin.com/in/adrian-vera-6180a7b6/";
    var image_src = "https://media.licdn.com/media/AAEAAQAAAAAAAAQmAAAAJGVjZDJkNDI5LWU1NmYtNGRiOC04NzhhLTQ3MjlkM2NhYmUzYw.jpg";
    var linkedin_logo = "https://cdn3.iconfinder.com/data/icons/free-social-icons/67/linkedin_circle_color-512.png";
    
    //Redefining variables for each student object
    // for(var j =0; j<studentGroupsArray; j++){

    //     var title = [
    //     '<div class="after-box">'+studentGroupsArray[j]+'</div>'
    //     ].join("\n");

    //     $("#student_frame").append(title);

        for(var i =0; i<arrayOfObjects.length; i++){
            //if(arrayOfObjects[i].student_group == studentGroupsArray[j]){
                student_firstname = arrayOfObjects[i].name;
                student_lastname = arrayOfObjects[i].lastname;
                student_email = arrayOfObjects[i].email;
                student_linkedin = arrayOfObjects[i].linkedin;
                image_src = arrayOfObjects[i].image;

                //where you create the HTML that is to be injected


                var html = [
                '<div class = "floating-box">',
                    '<img src='+ image_src +' height="150px" width="150px">',
                    '<p class= "name_email">'+ student_firstname + " " + student_lastname +'</p>',
                    '<p class= "name_email">'+ student_email +'</p>',
                    '<a href = "'+student_linkedin+'"><img src="linkedin_logo.png" height="15px" width="15px margin="1px" "></a>',
                '</div>'
                ].join("\n");

                $("#student_frame").append(html);

            //}
        }
    //}
}

/**
 * Finds and creates student groups array of all student groups in CSV
 */
function findStudentGroups(){
    for(var i=0; i<arrayOfObjects.length; i++){
        var curr_student_group = arrayOfObjects[i].student_group;
        var contains_student_group = contains.call(studentGroupsArray, curr_student_group);
        if(!contains_student_group){    
            studentGroupsArray.push(curr_student_group);
        }
    }
    console.log(studentGroupsArray);
}


/**
 * Checks if you the array contains a given value ... 
 EX:
 var myArray = [0,1,2],
    needle = 1,
    index = contains.call(myArray, needle); // true
 */
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;
            for(i = 0; i < this.length; i++) {
                var item = this[i];
                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }
    return indexOf.call(this, needle) > -1;
};

/**
 * Creates a student object from inputted student array
 */
function createStudentObject(student) {
    var studentObject = new function(){
        this.class = student[0];
        this.name = student[1];
        this.lastname = student[2];
        this.netid = student[3];
        this.email = student[4];
        this.linkedin = student[5];
        this.image = student[6];
        this.student_group = student[7];
    }
    arrayOfObjects.push(studentObject);
}

/**
 * reads text input, parses string, and creates an array of student objects
 */
function readText(filePath) {
    var output = ""; //placeholder for text output
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            
            //Parse the csv file by new line
            var lines = this.result.split('\n');
            //Creating a new array on the data on the line 
            for(var line = 0; line <lines.length; line++){
                var currStudent = lines[line];
                //create an array of current student's attributes
                var student = currStudent.split(",");
                //creates student object
                createStudentObject(student);
            }
            console.log(arrayOfObjects);
            findStudentGroups();


        
        };//end onload()
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
        try {
            reader = new ActiveXObject("Scripting.FileSystemObject");
            var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
            output = file.ReadAll(); //text contents of file
            file.Close(); //close file "input stream"
            displayContents(output);
        } catch (e) {
            if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' + 
                 'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
                 'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
            }
        }       
    }
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }       
    return true;
}   
 
