<?php
// Ensure that the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if a file is uploaded
    if (isset($_FILES["uploaded_file"]) && $_FILES["uploaded_file"]["error"] == UPLOAD_ERR_OK) {
        $targetDir = "uploads/";
        $targetFile = $targetDir . basename($_FILES["uploaded_file"]["name"]);

        // Move uploaded file to target directory
        if (move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], $targetFile)) {
            // Read the uploaded file content
            $fileContent = file_get_contents($targetFile);

            // Highlight the first three letters of each word
            $highlightedContent = preg_replace_callback('/\b\w{3}\w*/', function ($match) {
                return "<span style='background-color: ".$_POST['highlight_color'].";'>".$match[0]."</span>";
            }, $fileContent);

            // Generate a modified file with highlighted content
            $modifiedFile = "modified_" . basename($_FILES["uploaded_file"]["name"]);
            file_put_contents($modifiedFile, $highlightedContent);

            // Set headers to trigger file download
            header("Content-Type: application/octet-stream");
            header("Content-Disposition: attachment; filename=$modifiedFile");
            readfile($modifiedFile);

            // Clean up temporary files
            unlink($targetFile);
            unlink($modifiedFile);
        } else {
            echo "Error uploading file.";
        }
    } else {
        echo "No file uploaded.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Bionic Reading App</title>
</head>
<body>
    <h1>Bionic Reading App</h1>
    <form method="post" enctype="multipart/form-data">
        <label for="uploaded_file">Upload File:</label>
        <input type="file" name="uploaded_file" id="uploaded_file">
        <br>
        <label for="highlight_color">Highlight Color:</label>
        <input type="color" name="highlight_color" id="highlight_color">
        <br>
        <input type="submit" value="Upload and Highlight" name="submit">
    </form>
</body>
</html>
