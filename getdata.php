<?php
session_start();
error_reporting(0);

class magic_notes {
    private $user;

    public function __construct()
    {
        $this->user = $_SESSION['user'];
    }

    public function get_user() {
        if(!empty($this->user)) {
            echo $this->user;
        } else {
            echo "";
        }
    }

    public function get_notes() {
        if(!empty($this->user)) {
            $con = mysqli_connect("localhost","root","","magicnotes");
            $query = "select * from ". strtolower($this->user);
            $res = mysqli_query($con,$query);
            $msg = "";

            if(mysqli_num_rows($res) > 0) {
                while($data = mysqli_fetch_assoc($res)) {
                    $msg .= '
                    <div class="col-lg-3 col-md-6 portfolio-item">
                        <div class="portfolio-wrap" id="note-'. $data['id'] .'" style="background:'. $data['theme'] .'">
                            <h1 class="note-title">'. $data['title'] .'</h1><hr>
                            <h2 class="note-desc">'. $data['content'] .'</h2>
                            
                            <div class="portfolio-info">
                                <button class="delete-note"><i class="far fa-trash-alt"></i></button>
                                <button class="color-note"><i class="fas fa-palette"></i></button>
                                <button class="textSpeak"><i class="icofont-mic"></i></button>
                            </div>

                            <hr>
                            <div class="colors">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>';
                }

                $msg .= " 
                <script>
                $('.textSpeak').on('click', function () {
                    let note = $(this).parent('.portfolio-info').parent('.portfolio-wrap').children('.note-desc').text();
                    responsiveVoice.speak(note);
                });

                $('.portfolio .portfolio-info .color-note').on('click', function () {
                    $('.portfolio .colors').toggleClass('active');
                });
            
                $('.portfolio .colors span').on('click', function () {
                    $('.portfolio .colors').toggleClass('active');
            
                    let color = $(this).css('background-color');
                    let id = $(this).parent('.colors').parent('.portfolio-wrap').attr('id');
            
                    $(this).parent('.colors').parent('.portfolio-wrap').css({
                        background: color
                    });
            
                    $.ajax({
                        url: 'getdata.php',
                        type: 'post',
                        data: {
                            str: 'set_theme',
                            color: color,
                            id: id
                        },
                        success: function (data) {
                            // alert(data);
                        }
                    });
                });

                $('.note-window .colors span').on('click', function () {
                    let color = $(this).css('background-color');
            
                    $('.note-window .note-title, .note-window .options, .note-window').css({
                        background: color
                    });
                });

                $('.portfolio .portfolio-info .delete-note').on('click', function () {
                    let id = $(this).parent('.portfolio-info').parent('.portfolio-wrap').attr('id');

                    $.ajax({
                        url: 'getdata.php',
                        type: 'post',
                        data: {
                            str: 'delete_note',
                            id: id
                        },
                        success: function (data) {}
                    });

                    $.ajax({
                        url: 'getdata.php',
                        type: 'post',
                        data: {
                            str: 'get_notes'
                        },
                        success: function (data) {
                            $('.portfolio-container').html(data);
                        }
                    });
                });

                $('.portfolio-wrap .note-title, .portfolio-wrap .note-desc').on('click', function () {
                    $('.overlay, .note-window').addClass('active');
            
                    $('.note-window .options, .note-window .note-title, .note-window').css({
                        background: $(this).parent('.portfolio-wrap').css('background')
                    });

                    $('.note-window .options, .note-window .note-title, .note-window').css({
                        background: $(this).parent('.portfolio-wrap').css('background')
                    });
                    
                    $('#hidden-id').val($(this).parent('.portfolio-wrap').attr('id'));
                    $('.note-window .note-title').val($(this).parent('.portfolio-wrap').children('.note-title').html());
                    $('.note-window .note-desc').val($(this).parent('.portfolio-wrap').children('.note-desc').html());
                });
            
                $('.overlay, .note-window .close-window').on('click', function () {
                    $('.overlay, .note-window').removeClass('active');
            
                    $.ajax({
                        url: 'getdata.php',
                        type: 'post',
                        data: {
                            str: 'update_note',
                            title:  $('.note-window .note-title').val(),
                            content: $('.note-window .note-desc').val(),
                            id: $('#hidden-id').val(),
                            color: $('.note-window .note-title').css('background-color')
                        },
                        success: function (data) {
                            if(data != '') {
                                alert(data);
                            }
                        }
                    });

                    $.ajax({
                        url: 'getdata.php',
                        type: 'post',
                        data: {
                            str: 'get_notes'
                        },
                        success: function (data) {
                            $('.portfolio-container').html(data);
                        }
                    });
                });
                </script>";
                
                echo $msg;
            } else {
                echo "
                <div class='nothing'>
                    <h1>Noting To Show</h1>
                    <h2><i class='icofont-ui-add'></i></h2>
                    <h3>Add Your Notes</h3>
                </div>
                ";
            }

        }
    }

    // Add user note.
    public function add_note() {
        if(!empty($this->user)) {
            if(!empty($_POST['content'])) {
                
                $con = mysqli_connect("localhost","root","","magicnotes");
                if(empty($_POST['title'])) {
                    $query = "insert into ". strtolower($this->user) ." values(NULL, 'Note', '". $_POST['content'] ."', '')";
                } else {
                    $query = "insert into ". strtolower($this->user) ." values(NULL, '". $_POST['title'] ."', '". $_POST['content'] ."', '')";
                }
                $res = mysqli_query($con,$query);
                // echo $query;
            }
        }
    }

    // Add user note.
    public function update_note() {
        if(!empty($this->user)) {
            if(!empty($_POST['content'])) {
                
                $id = str_replace('note-', '', $_POST['id']);
                $con = mysqli_connect("localhost","root","","magicnotes");
                if(empty($_POST['title'])) {
                    $query = "update ". strtolower($this->user) ." set title = 'Note', content = '". $_POST['content'] ."', theme = '". $_POST['color'] ."' where id = ". $id;
                } else {
                    $query = "update ". strtolower($this->user) ." set title = '". $_POST['title'] ."', content = '". $_POST['content'] ."', theme = '". $_POST['color'] ."' where id = ". $id;
                }
                
                $res = mysqli_query($con,$query);
                echo "";
            } else {
                echo "Content cannot be empty !";
            }
        }
    }

    // Delete user note.
    public function delete_note() {
        if(!empty($this->user)) {
            $id = str_replace('note-', '', $_POST['id']);

            $con = mysqli_connect("localhost","root","","magicnotes");
            $query = "delete from ". strtolower($this->user) ." where id = '". $id ."'";
            $res = mysqli_query($con,$query);
        }
    }

    public function set_theme() {
        if(!empty($this->user)) {
            $id = str_replace('note-', '', $_POST['id']);

            $con = mysqli_connect("localhost","root","","magicnotes");
            $query = "update ". strtolower($this->user) ." set theme = '". $_POST['color'] ."' where id = '". $id ."'";
            $res = mysqli_query($con,$query);
        }
    }
}

$notes = new magic_notes();
$str = $_POST['str'];

// Check User logged in or not.
if($str == "get_user") {
    $notes->get_user();
}
// Get user notes.
else if($str == "get_notes") {
    $notes->get_notes();
} 
// Delete user note.
else if($str == "delete_note") {
    $notes->delete_note();
} 
// Add user note.
else if($str == "add_note") {
    $notes->add_note();
} 
// Edit user note.
else if($str == "update_note") {
    $notes->update_note();
} 
// Set theme to the note.
else if($str == "set_theme") {
    $notes->set_theme();
} 
else {
    die('Error 404 !');
}
?>