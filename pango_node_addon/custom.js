$(document).ready(function() {
	$('.form-control').keyup(function(){
		ReplaceImage();
	})
	$('.form-control').change(function(){
		ReplaceImage();
	})
});

function EncodeQueryData(data)
{
   var ret = [];
   for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
   return ret.join("&");
}

function ReplaceImage(){
		 var values = { 
	    	message: $('textarea[name="message"]').val(),
	    	m_font: $('select[name="m_font"]').val(),
	    	m_font_color: $('input[name="m_font_color"]').val(),
	    	m_width: $('input[name="m_width"]').val(),
	    	m_height: $('input[name="m_height"]').val(),
	    	m_font_size: $('input[name="m_font_size"]').val(),
	    	m_x_offset: $('input[name="m_x_offset"]').val(),
	    	m_y_offset: $('input[name="m_y_offset"]').val(),
	    	m_gravity: $('select[name="m_gravity"]').val(),
	    	recipient: $('input[name="recipient"]').val(),
	    	r_font: $('select[name="r_font"]').val(),
	    	r_font_color: $('input[name="r_font_color"]').val(),
	    	r_width: $('input[name="r_width"]').val(),
	    	r_height: $('input[name="r_height"]').val(),
	    	r_font_size: $('input[name="r_font_size"]').val(),
	    	r_x_offset: $('input[name="r_x_offset"]').val(),
	    	r_y_offset: $('input[name="r_y_offset"]').val(),
	    	r_gravity: $('select[name="r_gravity"]').val(),
	    	sender: $('input[name="sender"]').val(),
	    	s_font: $('select[name="s_font"]').val(),
	    	s_font_color: $('input[name="s_font_color"]').val(),
	    	s_width: $('input[name="s_width"]').val(),
	    	s_height: $('input[name="s_height"]').val(),
	    	s_font_size: $('input[name="s_font_size"]').val(),
	    	s_x_offset: $('input[name="s_x_offset"]').val(),
	    	s_y_offset: $('input[name="s_y_offset"]').val(),
	    	s_gravity: $('select[name="s_gravity"]').val()
	    }
	    console.log($('input[name="m_gravity"]').val());
		var qstring = EncodeQueryData(values);
		var repl_image = $('<img class="img-responsive" id="image1" />')
			.attr('src', '/generateTextLayer?' + qstring)
			.load(function(){
				$('#generated_image').html($(this));
			})
	}