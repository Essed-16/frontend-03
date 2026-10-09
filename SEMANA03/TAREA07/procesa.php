<?php
$servername = 'localhost';
$database = 'test';
$username = 'root';//
$password = '';//
$port = '3306';


$conn = mysqli_connect($servername, $username, $password, $database, $port);


if (!$conn) {
    echo json_encode(['status' => 400, 'message' => 'Error en la conexión a la base de datos']);
    exit();
}else{
    // Obtener datos del JSON recibido
    $input = json_decode(file_get_contents('php://input'), true);

    $nombre = $input['nombre'] ?? '';
    $correo = $input['correo'] ?? '';
    $clave = $input['clave'] ?? '';    

    // Validar correo electrónico
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 999, 'message' => 'Correo electrónico no válido']);
        exit();
    }

    // Verificar si el correo ya está registrado
    $sql = "SELECT * FROM usuarios WHERE correo='".$correo."'";
    $resultado = mysqli_query($conn,$sql);
    
    if(mysqli_num_rows($resultado)>0){

        echo json_encode(['status' => 402, 'message' => 'El correo ya está registrado']);
        
    }else{

        $sql = "SELECT coalesce(max(id),0)+1 as id FROM usuarios";
        $res = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($res);
        $new_id_usuario = $row['id'];      
        
        $sql = "INSERT INTO usuarios (id,correo,nombre,clave,fecha_registro,estado) 
                VALUES ('$new_id_usuario','$correo','$nombre','$clave',now(),1)";
        $exito = mysqli_query($conn,$sql);
        if ($exito) {
            echo json_encode(['status' => 200, 'message' => 'Registro exitoso', 'id' => $new_id_usuario]);
        } else {
            echo json_encode(['status' => 401, 'message' => 'Error al registrar el usuario']);
        }       
        
    }
    
}


mysqli_close($conn);

?>