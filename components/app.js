
class App{
  constructor(gradeTable,pageHeader,gradeForm){
    this.handleGetGradesError=this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess=this.handleGetGradesSuccess.bind(this);
    this.gradeTable=gradeTable;
    this.pageHeader=pageHeader;
    this.gradeForm=gradeForm;
    this.createGrade=this.createGrade.bind(this);
    this.handleCreateGradeError=this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess=this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade=this.deleteGrade.bind(this);
    this.handleDeleteGradeSuccess=this.handleDeleteGradeSuccess.bind(this);
    this.handleDeleteGradeError=this.handleDeleteGradeError.bind(this);
    this.updateExistingGrade=this.updateExistingGrade.bind(this);
  }
  handleGetGradesError(error){
    console.error("error");
  }
  handleGetGradesSuccess(grades){
    this.gradeTable.updateGrades(grades);
    var gradesSum=0;
    var gradesLength=grades.length
    for(var i=0;i<grades.length;i++){
     gradesSum+=grades[i].grade;
    }
    var avgGrade=Math.trunc(gradesSum/gradesLength);
    this.pageHeader.updateAverage(avgGrade);
  }
  getGrades(){
    $.ajax({
      method:"GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: { "X-Access-Token": "bMeUYeQj"},
      success:this.handleGetGradesSuccess,
      error:this.handleGetGradesError
    })
  }
  start(){
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.OnUpdateClick(this.updateExistingGrade)
  }
  createGrade(name,course,grade){
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data:{ "name": name,
             "course": course,
             "grade": grade
          },
      headers: { "X-Access-Token": "bMeUYeQj" },
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError
    })
  }
  handleCreateGradeError(error){
    console.error();
  }
  handleCreateGradeSuccess(){
    this.getGrades();
  }
  deleteGrade(id){
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/"+id,
      headers: { "X-Access-Token": "bMeUYeQj" },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError
    })
  }
  handleDeleteGradeError(error){
    console.error(error);
  }
  handleDeleteGradeSuccess(){
    this.getGrades();
  }
  updateExistingGrade(id,name,course,grade){
    $.ajax({
      method:"PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      data:{
            "name": name,
            "course": course,
            "grade": grade
            },
      headers: { "X-Access-Token": "bMeUYeQj" },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError
    })
  }
}
