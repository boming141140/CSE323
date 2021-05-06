<!DOCTYPE html>
<html>
    <head>
        <link class="jq" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css" />
        <script class="jq" src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script class="jq" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        <script src="https://apis.google.com/js/client.js"></script>
        <meta charset=utf-8 />
        <title>Fruit Calorie</title>
    </head>
        <style>
            article, aside, figure, footer, header, hgroup, 
            menu, nav, section { display: block; }
        </style>
    </head>
    <body>
        
        <?php
            function base64url_encode($data) { 
                return rtrim(strtr(base64_encode($data), '+/', '-_'), '='); 
            }

            //Google's Documentation of Creating a JWT: https://developers.google.com/identity/protocols/OAuth2ServiceAccount#authorizingrequests

            //{Base64url encoded JSON header}
            $jwtHeader = base64url_encode(json_encode(array(
                "alg" => "RS256",
                "typ" => "JWT"
            )));
            //{Base64url encoded JSON claim set}
            $now = time();
            $jwtClaim = base64url_encode(json_encode(array(
                "iss" => "foodai@nth-aggregator-312802.iam.gserviceaccount.com",
                "scope" => "https://www.googleapis.com/auth/cloud-platform",
                "aud" => "https://www.googleapis.com/oauth2/v4/token",
                "exp" => $now + 3600,
                "iat" => $now
            )));
            //The base string for the signature: {Base64url encoded JSON header}.{Base64url encoded JSON claim set}
            $key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcVrvS1pDqSdJ7\nKtfoE1A9n0/Kad2SW96oELIkGIgUq0VrECR6LjqAUTtW/6p9lpuIPbQ6jMwtqql1\nq9T3o2wbBsI4jo66c68XjxcDAx/o9RqirYMg5cbqR7Fhwk3xIDBTggjNcV57IwCi\nyZZj+mkPx5Iu0kzFs2feYxG1NQfOILH1+ro7+liTYocPwiwUtuFc+67nDy9Yc4KP\n136vQjP1IsfBuOOCy4ahHAV+Lhrm4ZGOgakdXttu895dBhEgjIr73mV+abkwwx2H\ns/4G/Hqd5Y0JgiajbnqdzW3E8i5ZQi8fLSs9618p3trElMf3akbDYKiCazBBNeqQ\nSQhII9sZAgMBAAECggEASCB9w95I+kY3rKpN9NxgMyXaPoTL+/eViE03mo6UzZBc\n1PGcGqBUThnr+g22/vzqYZcyHKcTlef8CXVOqjdDq05ZcZVXhO7VM1XJJJMe+C+I\na9AIRLetpy2PSQ5HPjz+/q/p1rp8f+vcob3GO/bt3KFSsHZGhBlqjL+BDmxaXv6e\nwCaPi22I8xzLk82CiX+RWdcwrqJI8pZnPR2PfFgHN8QnPiUIRRR0R6vwu9FjJnd/\nNgf3lmbUBCpv7InhGSDG5o28J9AHGDC3vNM7BQsXuieg0JK236dVLpOvwDdxK2Dy\ncTvhYqOs5PBD8ryYlfNaGln9LVm59PNxsOYspW9bVwKBgQDRmgRgRniLq0kXGRFT\nQOBz2aCOPRdjV5gOkjFn6QlsN658IDmBUfQi0P0Ks9YNra8bMUl+aHOVxkHw5NGb\nnMM7VjJntEXNmSnUemStFzfPQAUgE6XAsKrzFJjzbGI+SgEOFBwHuKRFNV6Qe5CB\nVTjAHzBcaPBS1ZWNPexj8wcGDwKBgQC+8lkjDkJeH/hcJFFp/evZqUQaDG8FvFt4\nKRxlSdOSLRhjMzkHYfbYcn8rFmRwXycgwWGFsVrt/A5UfHPlWW+nu9DXda6HJvCx\nlWXoNjlt8RQg+h2DXQIvhyG4lR2cTo0+VknBdQmrc/kEFzOWBulgBJzhYEJxfvhG\nW07qr950VwKBgD/mgKcJVP7fvWy5S7rh8IvhMT2sClFTBxyKHV3cge7oGt3kxSNT\n5OYoaLy2ju+kn9necNWE6pgi1T+nwu96H1sbsEpFf3Jq24HXvpG2nmEk12ssEkBo\nm/V3thmgVWNAFIpCPzlrZUlkN+w8f5WucZrA53GE3J+kVe+1jTf7g4ypAoGBAK/C\n2kPHa1XCrdT65SngPkmTYglsKoGoGLYpeWbOpv3lno4pZzQhe5tPATmDGh7Jp3Wi\nK4dpcl6fZf1ktTWGtp0554l8XJMxR9revvgZeZF2mGWmdKYnZcyj4WlLcP8g2yhn\nOurlNWppjOy0Apr1b7ofZNybw20/R39TqvehvO1vAoGAb4tSrc+fHZjwvWPCSKwJ\nWrv6VnwZVnrpsI4zKF2VpwnR4vTnn9gWl19IJ7Nb+Uwug3dSyMPy3dQcvxO+LKn9\nOQpBLLLVkBucQ2WRWmtB/ZqIkvg7U1VblcvK1M95/y2+3hpTp0/RFqx4wQnNETn+\njUNbXlBE6GWi5NhVLVlGSCM=\n-----END PRIVATE KEY-----\n";
            openssl_sign(
                $jwtHeader.".".$jwtClaim,
                $jwtSig,
                $key,
                "sha256WithRSAEncryption"
            );
            $jwtSig = base64url_encode($jwtSig);
            $jwtAssertion = $jwtHeader.".".$jwtClaim.".".$jwtSig;
            echo "<div id = 'emp'  style = 'display: none;'>" . $jwtAssertion . "</div>";
        ?>
        <input type='file' accept="image/*" onchange="readURL(this);" />
        <img id="im" src="#" alt="your image" />
        <script src = "script/index.js"></script>
    </body>
</html>
