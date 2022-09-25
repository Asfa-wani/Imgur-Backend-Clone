$(document).ready(function () {
    /* activate the carousel */
    $('#modal-carousel').carousel({ interval: false });
  
    /* change modal title when slide changes */
    $('#modal-carousel').on('slid.bs.carousel', function () {
      $('.modal-title').html($(this).find('.active img').attr('title'));
    });
  
    /* when clicking a thumbnail */
    $('.row .thumbnail').click(function () {
      const content = $('.carousel-inner');
      const title = $('.modal-title');
  
      content.empty();
      title.empty();
  
      const { id } = this;
      const repo = $('#img-repo .item');
      const repoCopy = repo.filter(`#${id}`).clone();
      const active = repoCopy.first();
  
      active.addClass('active');
      title.html(active.find('img').attr('title'));
      content.append(repoCopy);
  
      // show the modal
      $('#modal-gallery').modal('show');
    });
  });
  