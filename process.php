<?php
if ($_FILES['uploadedFile']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['uploadedFile']['tmp_name'];
    $fileName = $_FILES['uploadedFile']['name'];
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

    if ($fileExtension === 'pdf') {
        // Use PDF library (e.g., setasign/fpdi) to extract text
    } elseif ($fileExtension === 'doc' || $fileExtension === 'docx') {
        // Use DOC library (e.g., phpoffice/phpword) to extract text
    } elseif ($fileExtension === 'txt') {
        $text = file_get_contents($fileTmpPath);
    }

    if (isset($text)) {
        function highlightText($text, $color) {
            $words = explode(' ', $text);
            $highlightedWords = array_map(function ($word) use ($color) {
                $highlightedPart = '<span style="background-color: ' . $color . ';">' . substr($word, 0, 3) . '</span>';
                return $highlightedPart . substr($word, 3);
            }, $words);
            return implode(' ', $highlightedWords);
        }

        $highlightedText = highlightText($text, $_POST['highlightColor']);

        $modifiedFilePath = 'modified_' . $fileName;
        file_put_contents($modifiedFilePath, $highlightedText);

        echo '<a href="' . $modifiedFilePath . '" download>Download Modified File</a>';
    }
}
?>
