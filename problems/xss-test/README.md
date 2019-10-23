### 問題
XSSが通るかのテストです。多分通る気がする。
<script>alert("XSS1");</script>
<img src=alert("XSS2") />
<button onclick='alert("XSS3")'>CLICK</button>

