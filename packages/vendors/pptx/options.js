export const DefaultOptions = () => ({
  // These are the defaults.
  // pptxFileUrl: "",
  // fileInputId: "",
  slidesScale: '', //Change Slides scale by percent
  slideMode: false, /** true,false*/
  slideType: 'divs2slidesjs',  /*'divs2slidesjs' (default) , 'revealjs'(https://revealjs.com)  -TODO*/
  revealjsPath: '', /*path to js file of revealjs - TODO*/
  keyBoardShortCut: false,  /** true,false ,condition: slideMode: true XXXXX - need to remove - this is doublcated*/
  mediaProcess: true, /** true,false: if true then process video and audio files */
  jsZipV2: false,
  themeProcess: true, /*true (default) , false, "colorsAndImageOnly"*/
  incSlide:{
    width: 0,
    height: 0
  },
  slideModeConfig: {
    first: 1,
    nav: true, /** true,false : show or not nav buttons*/
    navTxtColor: 'black', /** color */
    keyBoardShortCut: true, /** true,false ,condition: */
    showSlideNum: true, /** true,false */
    showTotalSlideNum: true, /** true,false */
    autoSlide: true, /** false or seconds , F8 to active ,keyBoardShortCut: true */
    randomAutoSlide: false, /** true,false ,autoSlide:true */
    loop: false,  /** true,false */
    background: false, /** false or color*/
    transition: 'default', /** transition type: "slid","fade","default","random" , to show transition efects :transitionTime > 0.5 */
    transitionTime: 1 /** transition time between slides in seconds */
  },
  revealjsConfig: {}
})
