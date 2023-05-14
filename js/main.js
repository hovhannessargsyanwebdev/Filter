const body = document.querySelector('body')
const search = document.querySelector('.search')
const mainWrapp = document.querySelector('.main-wrapp')
const searchInputWrapp = document.querySelector('.search-input-wrapp')
const filterPart = document.querySelector('.filter-part')
const searchInput = document.querySelector('.search')
const hintText = document.querySelector('.hint-text')
const productWrapp = document.querySelectorAll('.product-wrapp')
const paginationPanel = document.querySelector('.pagination-panel')
const productCard = document.querySelectorAll('.card')
const btnAddToCard = document.querySelectorAll('.add')
const productName = document.querySelectorAll('.model-title')
const filterPage = document.querySelector('.filter-page')
const mainContainer = document.querySelector('.main-container')
const filteredContainer = document.querySelector('.filtered-container')
const showMoreBtn = document.querySelectorAll('.show-more-product')
let detailsProduct = document.querySelectorAll('.details-product')
let detailsProductCard = document.querySelectorAll('.details-product-card')
const detailsModal = document.querySelector('.details-modal')
const closeModalBtn = document.querySelector('.close-modal-icon')
const goMain = document.querySelector('.go-main-btn')
const selectDropDown = document.querySelector('.filter-part')

const filterPanel = document.querySelector('.filter-panel')
const label = document.querySelectorAll('label')

const brandNames = document.querySelector('.brand-names')
const checkBoxes = document.querySelectorAll('input[type=checkbox]')
const leftPanelItems = document.querySelectorAll('.pr-check')
const labelText = document.querySelectorAll('.label-text')
const availableCount = document.querySelectorAll('.available-count')
let noContent = document.querySelector('.modal-no-content')
let noserved = document.querySelector('.modal-no-served')

let brandsList = []

let appleNewContainer = [] 
let samsungNewContainer = []  
let onePlusNewContainer = []  
let huaweiNewContainer = []  
let honorNewContainer = []  
let googlePixelNewContainer = []  
let oppoNewContainer = [] 

let brandContainer = [
  appleNewContainer,samsungNewContainer,onePlusNewContainer,
  huaweiNewContainer,honorNewContainer,googlePixelNewContainer,oppoNewContainer
]
let targetValuesFilterPanel = []
let resultTarget = []

let newProductWrappIndex
let activeBrandNameIdx
let newFilteredCard

let targetcurrentIndex
let isChecked = false

window.onload = function () {
  setTimeout(() => {
    const observer = new IntersectionObserver(((entries) => {
      entries.forEach((entry, idx) => {
        // let currentHeight = entry.target.offsetHeight
        if (entry.isIntersecting) {
          document.querySelectorAll('.pagination-link').forEach((link) => {
            let id = link.getAttribute('href').replace('#', '')
            if (id === entry.target.id) {             
              link.children[0].classList.add('pagination-active-bullet')
              if (entry.target.id == '_1') {
                document.documentElement.scrollTop = 92 + 'px'
              }              
            }
            else {
              link.children[0].classList.remove('pagination-active-bullet')
            }
          })
        }
      })
    }), {
      threshold: 0.1
    })
    
    productWrapp.forEach(item => {
      observer.observe(item)
      brandsList.push(item.children[0].textContent.trim())
    })

    productCard.forEach((item) => {
      if (item.closest('#_1')) appleNewContainer.push(item)
      if (item.closest('#_2')) samsungNewContainer.push(item)
      if (item.closest('#_3')) onePlusNewContainer.push(item)
      if (item.closest('#_4')) huaweiNewContainer.push(item)
      if (item.closest('#_5')) honorNewContainer.push(item)
      if (item.closest('#_6')) googlePixelNewContainer.push(item)
      if (item.closest('#_7')) oppoNewContainer.push(item) 
    }) 

    showMoreBtn.forEach(item => {
      item.addEventListener('click', (e) => {
      // let resultTarget
      let newContainerWrapp = e.target.closest('.product-wrapp')
      if (newContainerWrapp.id == '_1') resultTarget = appleNewContainer
      if (newContainerWrapp.id == '_2') resultTarget = samsungNewContainer
      if (newContainerWrapp.id == '_3') resultTarget = onePlusNewContainer
      if (newContainerWrapp.id == '_4') resultTarget = huaweiNewContainer
      if (newContainerWrapp.id == '_5') resultTarget = honorNewContainer
      if (newContainerWrapp.id == '_6') resultTarget = googlePixelNewContainer
      if (newContainerWrapp.id == '_7') resultTarget = oppoNewContainer
      let options = {e, resultTarget}
      drawNewContainer(options)
      }, true)
    })

    label.forEach((_,idx) => {
      if (idx < 7) { 
        if (idx == 0) availableCount[idx].textContent = `( ${appleNewContainer.length} )`
        if (idx == 1) availableCount[idx].textContent = `( ${samsungNewContainer.length} )`
        if (idx == 2) availableCount[idx].textContent = `( ${onePlusNewContainer.length} )`
        if (idx == 3) availableCount[idx].textContent = `( ${huaweiNewContainer.length} )`
        if (idx == 4) availableCount[idx].textContent = `( ${honorNewContainer.length} )`
        if (idx == 5) availableCount[idx].textContent = `( ${googlePixelNewContainer.length} )`
        if (idx == 6) availableCount[idx].textContent = `( ${oppoNewContainer.length} )`
      }

      // item.addEventListener('click', (e) => {})
    }) 

    goMain.addEventListener('click', () => {
      resetContainerClasses()
      resultTarget = []
      targetValuesFilterPanel.length = 0
      noContent.classList.replace('d-flex', 'd-none')

      if (isChecked) {
        let checkBoxes = document.querySelectorAll('input[type=checkbox')
        checkBoxes.forEach(checkBox => checkBox.checked = false)
        isChecked = false
      }
      removeClone()     
    })

    function showDetails(e) {
      if (e.target.classList.contains('main-wrapp')) return

      if (e.target.matches('.product-img') ||
        e.target.matches('.model-title') ||
        e.target.matches('.price') ||
        e.target.matches('.view-details-btn')) {

        body.classList.add('overflow-hidden', 'h-100vh') 
        mainWrapp.classList.replace('d-flex', 'd-none')
        paginationPanel.classList.add('d-none')
        goMain.classList.remove('d-none', 'd-block')
        searchInputWrapp.classList.replace('d-flex', 'd-none')
        detailsModal.classList.replace('d-none', 'd-block')
 
        getCardsIndex(e)
        detailsProductCard[targetcurrentIndex].classList.replace('d-none', 'd-flex')
        detailsProductCard[targetcurrentIndex].closest('.details-product').classList.replace('d-none', 'd-block')
        document.querySelector('.details-modal').scrollTop = 0
      }
    } 
    mainWrapp.addEventListener('click', showDetails)
    mainWrapp.addEventListener('click', showNoServedModal) 

    function hideDetails(e) {
      if (e.target.classList.contains('close-modal-icon') || e.target.tagName == 'BODY') {  
        if (detailsModal.classList.contains('d-block')) { 
          body.classList.remove('overflow-hidden', 'h-100vh')
          mainWrapp.classList.replace('d-none', 'd-flex')
          searchInputWrapp.classList.replace('d-none', 'd-flex')
          goMain.classList.replace('d-none', 'd-block')
          detailsModal.classList.replace('d-block', 'd-none')

          if (filteredContainer.classList.contains('opacity-disable')) {
            paginationPanel.classList.remove('d-none')
          }

          detailsProductCard[targetcurrentIndex].classList.replace('d-flex', 'd-none')
          detailsProductCard[targetcurrentIndex].closest('.details-product').classList.replace('d-block', 'd-none')
          targetcurrentIndex = null      
        }
      }
    } 
    closeModalBtn.addEventListener('click', hideDetails)
    body.addEventListener('click', hideDetails)

    function showNoServedModal(e) {
      if (e.target.closest('.add')) {
        noserved.classList.add('show-modal-served')
        setTimeout(() => {
          noserved.classList.remove('show-modal-served')
        },2000)
      }
    }

    function removeClone() {
      document.querySelectorAll('.new-filtered-row').forEach(item => item.remove())
    }

    function resetContainerClasses() {
      mainContainer.classList.replace('d-none', 'd-block')
      filteredContainer.classList.replace('opacity-enable', 'opacity-disable')
      filteredContainer.classList.remove('show-new-container')
      filterPage.classList.remove('filtered')
      paginationPanel.classList.remove('d-none')
      searchInput.placeholder = 'Search ...'      
    }

    function resetInputClasses() {
      hintText.textContent = ''
      hintText.classList.replace('d-block', 'd-none')
      searchInput.value = ''
      searchInput.blur()
    }

    function filter(e) {
      let activeBrandIdx = null;
      let activeRomIdx = null;
      let activeRamIdx = null;
      let activeRatingIdx = null;
      let checkboxTitle = null
      let checkboxValue
      let activeCheckbox
      let currentCheckboxTitle
      let currentCheckedValue
      let getCheckbox
      let checkboxes
      let minPriceValue = +document.querySelector('.min-input').value
      let maxPriceValue = +document.querySelector('.max-input').value

      let checkboxWrapp = e.target.closest('.product-checkbox')
  
      if (e.target.className == 'product-text'||
       e.target.classList.contains('close-filter-panel') ||
       e.target.classList.contains('close-filter-panel-btn')) return
       
      if (e.target.closest('.filter-range-slider')) {
        checkboxTitle = e.target.closest('.filter-range-wrapp').children[0].textContent.trim()
        if (checkboxTitle == 'Price') {
          searchInput.placeholder = 'search ...'
          filtering([e])
        }
      }

      else if (e.target.closest('.product')) {
        checkboxes = e.target.closest('.product-checkbox').querySelectorAll('input[type=checkbox]') 
        checkboxTitle = e.target.closest('.product').children[0].textContent.trim()
        getCheckbox = e.target.closest('.product-checkbox').querySelectorAll('.pr-check') 
        currentValue = e.target.closest('.pr-check').querySelector('.label-text').textContent
        let valueTypeNumber = +currentValue
        checkboxValue = !isNaN(valueTypeNumber) ? valueTypeNumber : currentValue.trim().split(' ')[0].replace(/\s/g, '') 

        if (checkboxTitle == 'Brand') {
          // searchInput.placeholder = ''
          activeBrandIdx = String(getTargetCheckboxIndex(e))
          activeCheckbox = getCheckbox[activeBrandIdx].children[0]
          let activeBrandName = checkboxes[activeBrandIdx].closest('.pr-check').querySelector('.label-text').textContent
          searchInput.placeholder = `${activeBrandName}`

          let currentCheckboxText = getCheckbox[+activeBrandIdx].querySelector('.label-text').textContent.trim().split(' ')[0].replace(/\s/g, '')
          let checkboxParams = [e, activeBrandIdx, currentCheckboxText]
          filtering(checkboxParams)
        }   

        else if (checkboxTitle == 'ROM') {
          activeRomIdx = String(getTargetCheckboxIndex(e))
          activeCheckbox = getCheckbox[activeRomIdx].children[0]

          let currentCheckboxText = +getCheckbox[+activeRomIdx].querySelector('.label-text').textContent

          let checkboxParams = [e, activeRomIdx, currentCheckboxText]
          filtering(checkboxParams)
        }

        else if (checkboxTitle == 'RAM') {
          activeRamIdx = String(getTargetCheckboxIndex(e))
          activeCheckbox = getCheckbox[activeRamIdx].children[0]

          let currentCheckboxText = +getCheckbox[+activeRamIdx].querySelector('.label-text').textContent

          let checkboxParams = [e, activeRamIdx, currentCheckboxText]
          filtering(checkboxParams)
    
          // if (!resultTarget.length && getCheckbox[+activeRamIdx].children[0].checked == true) showHintText()
        }
      }

      else if (e.target.closest('.rating')) {
        checkboxes = e.target.closest('.product-checkbox').querySelectorAll('input[type=checkbox]') 
        checkboxTitle = e.target.closest('.rating').children[0].textContent.trim()
        getCheckbox = e.target.closest('.product-checkbox').querySelectorAll('.pr-check') 
        checkboxValue = e.target.closest('.pr-check').querySelector('.rating-stars').children.length

        if (checkboxTitle == 'Rating') {
          activeRatingIdx = String(getTargetCheckboxIndex(e))
          activeCheckbox = getCheckbox[activeRatingIdx].children[0]
  
          let currentCheckboxText = getCheckbox[+activeRatingIdx].querySelector('span').textContent.charAt(0)
  
          let checkboxParams = [e, activeRatingIdx, +currentCheckboxText]
          filtering(checkboxParams)
        }
      }    
     
      function getTargetCheckboxIndex(e) {
        let activeCheckboxGroup
        let targetRating = false
        let targetBrand = false
        if (e.target.closest('.product')) {
          activeCheckboxGroup = checkboxWrapp.querySelectorAll('.label-text')
          if (e.target.closest('.product').querySelector('.product-text').textContent.trim() == 'Brand') {
            targetBrand = true
          }
        }

        else if (e.target.closest('.rating')) {
          activeCheckboxGroup = checkboxWrapp.querySelectorAll('.rating-stars')   
          targetRating = true
        }    

        for (let i = 0; i < activeCheckboxGroup.length; i++) {
          if (targetRating) {
            if (activeCheckboxGroup[i].children.length == checkboxValue) return i
          }

          else if (targetBrand) {
            if (activeCheckboxGroup[i].textContent.trim().split(' ')[0].replace(/\s/g, '') == checkboxValue) return i
          }

          else {
            if (activeCheckboxGroup[i].textContent == checkboxValue) return i
          }
        }
      }

      isChecked = true  

      function filtering(arg) {
        let isCheckboxChecked = false
        let isTargetInputRange = false
        let currentTarget = arg[0].target ? arg[0].target : undefined 
        let activeIdx = arg[1] ? arg[1] : undefined      

        if (activeIdx) {
          if (!activeCheckbox.checked) {
            checkboxes.forEach((checkbox, idx) => {
              checkbox.checked = idx != +activeIdx ? false : true   
            })
          } 

          else if (activeCheckbox.checked) {
            getCheckbox[+activeIdx].children[0].checked = false
            isCheckboxChecked = false
            searchInput.placeholder = 'Search ...'
            if (noContent.classList.contains('d-flex')) {
              noContent.classList.replace('d-flex', 'd-none')
            }
          } 
        } 

        let allCheckbox = document.querySelectorAll('input[type=checkbox]')
        if (currentTarget.closest('.filter-part')) {
          if (currentTarget.closest('.filter-range-slider')) {
            if (!targetValuesFilterPanel.length) {
              targetValuesFilterPanel.push([minPriceValue, maxPriceValue])            
            }
            else {
              targetValuesFilterPanel[0] = [minPriceValue, maxPriceValue]
            }
          }
          
          if (targetValuesFilterPanel[0]) {
            if (typeof targetValuesFilterPanel[0][0] != 'number') {
              targetValuesFilterPanel.length = 0
            }
            else {
              targetValuesFilterPanel.length = 1
            }
          }
          else if (!targetValuesFilterPanel[0]) {
          targetValuesFilterPanel.length = 0
          }  

          for (let i = 0; i < allCheckbox.length; i++) {
            if (allCheckbox[i].checked) {
              isCheckboxChecked = true
              if (allCheckbox[i].closest('.product')) {
                currentCheckboxTitle = allCheckbox[i].closest('.product').children[0].textContent.trim()
   
                if (currentCheckboxTitle == 'Brand' || currentCheckboxTitle == 'ROM' || currentCheckboxTitle == 'RAM') {
                  if (currentCheckboxTitle == 'Brand') {
                    currentCheckedValue = allCheckbox[i].closest('.pr-check').querySelector('.label-text').textContent.trim().split(' ')[0].replace(/\s/g, '') 
                  }
                  else {
                    currentCheckedValue = allCheckbox[i].closest('.pr-check').querySelector('.label-text').textContent
                  }

                  currentCheckboxTitle = allCheckbox[i].closest('.product').children[0].textContent.trim()
                  targetValuesFilterPanel.push([currentCheckboxTitle, currentCheckedValue])
                }
              }

              else if (allCheckbox[i].closest('.rating')) {
                currentCheckboxTitle = allCheckbox[i].closest('.rating').children[0].textContent.trim()
                
                if (currentCheckboxTitle == 'Rating') {
                  currentCheckboxTitle = allCheckbox[i].closest('.rating').querySelector('.rating-text').textContent.trim()
                  currentCheckedValue = allCheckbox[i].closest('.pr-check').querySelector('.rating-stars').children.length
                  targetValuesFilterPanel.push([currentCheckboxTitle, currentCheckedValue])
                }
              }
            } 
          }
        }
         
        let currentResult = []
        if (currentTarget.closest('.filter-range-slider')) {
          isTargetInputRange = true
          searchInput.placeholder = 'Search ...'  
        }
        else { isTargetInputRange = false }

        productCard.forEach(card => {
          let isCorectValue = false
          let valueName
          let value
          let currentCardValue

          for (let i = 0; i < targetValuesFilterPanel.length; i++) {
            valueName = targetValuesFilterPanel[i][0]
            value = targetValuesFilterPanel[i][1]     
            if (typeof targetValuesFilterPanel[i][0] == 'number') {
              currentCardValue = parseInt(card.querySelector('.price').textContent)
            }      
            else {
              if (valueName == 'Brand') {
                currentCardValue = card.querySelector('.model-title').textContent.trim().split(' ')[0].replace(/\s/g, '')

              }
              else if (valueName == 'ROM') {
                currentCardValue = card.querySelector('.product-rom').textContent.trim().split(' ')[0].replace(/\s/g, '')
              }
              else if (valueName == 'RAM') {
                currentCardValue = card.querySelector('.product-ram').textContent.trim().split(' ')[0].replace(/\s/g, '')
              }
              else if (valueName == 'Rating') {
                currentCardValue = card.querySelector('.stars').children.length
              }             
            }

            if (typeof targetValuesFilterPanel[i][0] == 'number') {
              if (currentCardValue >= valueName && currentCardValue <= value) {
                isCorectValue = true
              }
              else {
                isCorectValue = false
                break
              }
            }
            else {
              if (currentCardValue != value) {
                isCorectValue = false
                break
              } 
              else if (currentCardValue == value) {
                isCorectValue = true
              }
            }
          }

          if (isCorectValue) currentResult.push(card)
        })

        resultTarget = currentResult

        if (isCheckboxChecked || isTargetInputRange) {
          if (!resultTarget.length) {
            noContent.classList.replace('d-none', 'd-flex')
          }
          else {
            noContent.classList.replace('d-flex', 'd-none')
          }
        }
        else if (!isCheckboxChecked || !isTargetInputRange) {
          resetContainerClasses()
          goMain.classList.replace('d-block', 'd-none')
        }
      }

      if (resultTarget) removeClone()

      let options = {e, resultTarget}
      drawNewContainer(options)
    }
    filterPanel.addEventListener('click', filter)

    function drawNewContainer(options) {
      let newItems = options.resultTarget
      
      if (!newItems.length) return

      let newFilteredRow
      let newProductRow
      
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

      mainContainer.classList.replace('d-block', 'd-none')
      filteredContainer.classList.add('show-new-container')
      filteredContainer.classList.replace('opacity-disable', 'opacity-enable')  
      goMain.classList.replace('d-none', 'd-block')
      paginationPanel.classList.add('d-none')   
      // searchInput.placeholder = 'Find Your phone'
      filterPage.classList.add('filtered')
      
      for (let i = 0; i < newItems.length; i++) {
        if (newItems.length - i >= 5) {
          newFilteredRow = document.createElement('div') 
          newFilteredRow.classList.add('new-filtered-row', 'product-wrapp','jc-sb')
          newProductRow = filteredContainer.insertAdjacentElement('beforeend', newFilteredRow)

          for (let j = i; j < i + 5; j++) {
            newFilteredCard = newItems[j].cloneNode(true) 
            newProductRow.insertAdjacentElement('beforeend', newFilteredCard)
          }
          i += 4
        }     
        else {
          let lastIndexes
          let k
          if (newItems.length >= 5) {
            lastIndexes = newItems.length - i
            let restItemsIdx = newItems.length - lastIndexes 
            k = restItemsIdx
          }
           else {
            k = 0
           }

          newFilteredRow = document.createElement('div') 
          newFilteredRow.classList.add('new-filtered-row', 'product-wrapp')            
          newProductRow = filteredContainer.insertAdjacentElement('beforeend', newFilteredRow)
          
          for (k; k < newItems.length; k++) {
            newFilteredCard = newItems[k].cloneNode(true) 
            newFilteredCard.classList.add('mr-20')
            newProductRow.insertAdjacentElement('beforeend', newFilteredCard)
          }

          break
        }
      }
    }
    
    function getCardsIndex(e) {
      for (let i = 0; i < productCard.length; i++) {
        let currentBrandName = productCard[i].querySelector('.model-title').textContent
        let currentPrice = productCard[i].querySelector('.price').textContent
        let currentRomMemory = productCard[i].querySelector('.product-rom').textContent
        let currentRamMemory = productCard[i].querySelector('.product-ram').textContent
        let currentRating = productCard[i].querySelector('.stars').children.length

        let targetBrandName = e.target.closest('.card').querySelector('.model-title').textContent
        let targetPrice = e.target.closest('.card').querySelector('.price').textContent
        let targetRomMemory = e.target.closest('.card').querySelector('.product-rom').textContent
        let targetRamMemorye = e.target.closest('.card').querySelector('.product-ram').textContent
        let targetRating = e.target.closest('.card').querySelector('.stars').children.length
        if (
          currentBrandName == targetBrandName &&
          currentPrice == targetPrice && 
          currentRomMemory == targetRomMemory && 
          currentRamMemory == targetRamMemorye && 
          currentRating == targetRating
          ) {
            targetcurrentIndex = i
            break
        }
      }
    }

    function getInputValue(e) {
      let inputVal = e.target.value.toLowerCase()

      if (inputVal.length < 2) return
   
      else if (inputVal.length > 1) {
        for (let i = 0; i < productName.length; i++) {
          let currentBrand = productName[i].textContent.split(' ')[0].toLowerCase()
          let currentModel = productName[i].textContent.split(' ')[1].toLowerCase()

          currentBrand = currentBrand == 'one' ? 'one plus' : currentBrand
          currentBrand = currentBrand == 'google' ? 'google pixel' : currentBrand

          let brandSubstr = currentBrand.slice(0, inputVal.length)
          let modelSubstr = currentModel.slice(0, inputVal.length)
          
          if (inputVal.trim() == brandSubstr || inputVal.trim() == modelSubstr) {
            return {currentBrand, currentModel}
          }
        }
      }
    }

    function getResultInput(e) {
      let val = getInputValue(e)

      if (!val) {
        hintText.classList.replace('d-block', 'd-none')
        return
      }
      
      else if (val) {  
        hintText.textContent = val.currentBrand
        hintText.classList.replace('d-none', 'd-block')
        checkBoxes.forEach((item) => item.checked = false)

        for (let i = 0; i < brandsList.length; i++) {
          if (val.currentBrand == brandsList[i].toLowerCase()) {
            checkBoxes[i].checked = true
            resultTarget = brandContainer[i]                  
            break
          }
        }

        let firstChar = val.currentBrand.charAt(0).toUpperCase()
        searchInput.placeholder = `${val.currentBrand.replace(val.currentBrand.charAt(0), firstChar)}`
      }
    }

    function serahcByHintText(e) {
      if ((e.key == 'Enter' || e.keyCode == 13) || e.type == 'click') {
        if (hintText.textContent != '') {
          resetInputClasses()

          if (resultTarget) removeClone()

          let options = {e, resultTarget}
          drawNewContainer(options)
          return
        }
      }
    }

    searchInput.addEventListener('keyup', getResultInput)
    searchInput.addEventListener('keyup', serahcByHintText)
    hintText.addEventListener('click', serahcByHintText)

    const filterPanelWrapp = document.querySelector('.filter-panel-wrapp')
    const closeFilterBtn = document.querySelector('.close-filter-panel')

    filterPanelWrapp.addEventListener('mouseenter', () =>  filterPanel.classList.remove('hide-filter-panel'))
    closeFilterBtn.addEventListener('click', () => filterPanel.classList.add('hide-filter-panel'))  
  }, 0)
}

// *****   get range values  ***** 
let inputSlider = document.getElementsByClassName('filter-range-slider')
for (let i = 0; i < inputSlider.length; i++) {
  let sliders = inputSlider[i].getElementsByTagName("input");
  for(let j = 0; j < sliders.length; j++) {
    if (sliders[j].type === "range" ) {
      sliders[j].oninput = getInputRangeValues;
      sliders[j].oninput();
    }
  }
}

function getInputRangeValues() {
  let parent = this.parentNode;
  let minRangeValue = document.querySelector('.min-range-value')
  let maxRangeValue = document.querySelector('.max-range-value')
  let slides = parent.getElementsByTagName("input");
  let slide1 = parseFloat(slides[0].value);
  let slide2 = parseFloat(slides[1].value);
  minRangeValue.textContent = slide1
  maxRangeValue.textContent = slide2
  let cordinateminValue = minRangeValue.getBoundingClientRect();
}
// *********
