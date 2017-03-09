var reader; //GLOBAL File Reader object for demo purpose only
var arrayOfObjects = new Array();
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
    var placeholder = "Constructing HTML Elements";
    //where you create the HTML Steven
    var html = [
    '<tr id ="photoRow" valign="middle" align="left">',
        '<td id="image1">',
            '<img id="image2" src ="" alt='+ placeholder +' width="150" height="150"/>',
        '</td>',
    '</tr>'
    ].join("\n");

    $("#imageRow").append(html);

    //console.log(tableRow);
}


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
        this.youtube = student[6];
        this.college = student[7];
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
 
