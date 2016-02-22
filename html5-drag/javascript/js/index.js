var columns = document.querySelectorAll('.columns .column');
var dragEl = null;

function domdragstart(event) {
  event.target.style.opacity = '0.5';

  dragEl = this;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('Text', this.firstChild.nodeValue);
}

function domdragend(event) {
  [].forEach.call(columns, function(column) {
    column.classList.remove('over');
    column.style.opacity = '1';
  });
}

function domdragenter(event) {
  event.preventDefault(); //自定义放置目标

  event.target.classList.add('over');

  event.dataTransfer.dropEffect = 'move';
}

function domdragover(event) {
  event.preventDefault(); //自定义放置目标
}

function domdrapleave(event) {
  event.target.classList.remove('over');
}

function domdrop(event) {
  event.preventDefault(); //阻止打开URL

  if ( dragEl !== this ) {
    dragEl.firstChild.nodeValue = this.firstChild.nodeValue
    this.firstChild.nodeValue = event.dataTransfer.getData('Text');
  }
}


[].forEach.call(columns, function(column) {
  column.addEventListener('dragstart', domdragstart, false);
  column.addEventListener('dragend', domdragend, false);

  column.addEventListener('dragenter', domdragenter, false);
  column.addEventListener('dragover', domdragover, false);
  column.addEventListener('dragleave', domdrapleave, false);
  column.addEventListener('drop', domdrop, false);
});
