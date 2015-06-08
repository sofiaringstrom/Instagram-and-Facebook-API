$(document).ready(function() {

	getPosts('nackaforummatochvin', 10);

});

function getPosts(tagName, limit) {

	// Remove posts in database before adding new posts
	$.ajax({

		type: 'POST',
		url: window.location.href + '/db/actions/db_empty_posts.php',
		success: function() {

			console.log('Successfully removed previously posts.');

		}

	});

	// Get new posts
	$.ajax({

		type: 'GET',
		//url: 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?client_id=28f30d951d944800a2b99ba1fb08dbf6&count=' + limit,
		url: 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?client_id=28f30d951d944800a2b99ba1fb08dbf6',
		success: function(tagPosts) {

			// Array for images by the specified tag
			var tagImages = [];

			// Index to count how many posts have been printed to add clearfix
			var postCountXs = 0;
			var postCountMd = 0;
			var postCountLg = 0;


			// Loop through images
			//for ( var i = 0, tagPostsLength = tagPosts.data.length; i < tagPostsLength && i < limit; ++i ) {
			for ( var i = 0, tagPostsLength = tagPosts.data.length; i < tagPostsLength; ++i ) {

				// Get image link
				var imgLink = tagPosts.data[i].images.thumbnail.url;
				
				// Get name
				var imgName = tagPosts.data[i].user.full_name;

				// Get username if user has no full name
				if ( imgName == '' ) {

					imgName = tagPosts.data[i].user.username;

				}

				// Get likes
				var imgLikes = tagPosts.data[i].likes.count;


				var clearfixXs = '<div class="clearfix visible-xs-block"></div>';
				var clearfixMd = '<div class="clearfix visible-md-block"></div>';
				var clearfixLg = '<div class="clearfix visible-lg-block"></div>';

				// Complete object with tags and info
				var tagPost = '<div class="col-xs-4 col-md-3 insta-post">' + imgName + '<img class="insta-img" src="' + imgLink + '"><br /><i class="fa fa-heart"></i><i> ' + imgLikes + 
					'</i> <button class="btn btn-vote">RÖSTA</button><br /></div>';

				if ( postCountXs == 2 ) {

					// Add clearfix
					tagPost += clearfixXs;

					postCountXs = 0;

				} else {

					postCountXs++;

				}

				if ( postCountMd == 4 ) {

					// Add clearfix
					tagPost += clearfixMd;

					postCountMd = 0;

				} else {

					postCountMd++;

				}

				if ( postCountLg == 5 ) {

					// Add clearfix
					tagPost += clearfixLg;
		
					postCountLg = 0;

				} else {

					postCountLg++;

				}


				// Add link to image array
				tagImages.push(tagPost);

				// tagPosts.pagination.next_url -> url för nästa 20 posts, kasta in i ajax-url:n

				// Save posts to database
				savePost(imgLink, imgName, imgLikes);

			}

			// Print insta posts to html
			$('#feed').html(tagImages.join(''));

		},
		dataType: 'jsonp'

	});

}


function savePost(imgLink, fullName, likes) {

	var postData = '?link=' + imgLink + '&name=' + fullName + '&likes=' + likes;

	$.ajax({

		url: window.location.href + '/db/actions/db_insert_post.php' + postData,
		type: 'GET',
		//data: postData,
		success: function(data, textStatus, jqXHR) {

			console.log('Success!');

		},
		error: function() {

			alert('An error occurd. Could not save posts to database.');

		}

	});

}



/*{ 
	"pagination":
	{
		"next_max_tag_id":"581237661759789538",
		"deprecation_warning":"next_max_id and min_id are deprecated for this endpoint; use min_tag_id and max_tag_id instead",
		"next_max_id":"581237661759789538",
		"next_min_id":"585192286484164406",
		"min_tag_id":"585192286484164406",
		"next_url":"https:\/\/api.instagram.com\/v1\/tags\/nackaforummatochvin\/media\/recent?count=1\u0026client_id=28f30d951d944800a2b99ba1fb08dbf6\u0026max_tag_id=581237661759789538"
	},
	"meta":{"code":200},
	"data":[{
		"attribution":null,
		"tags":[
			"nackaforum",
			"nackaforummatochvin"
		],
		"location":null,
		"comments":{
			"count":2,
			"data":
			[{
				"created_time":"1384015755",
				"text":"Hahah ser lite fattigt ut ja...",
				"from":{
					"username":"principessan",
					"profile_picture":"https:\/\/instagramimages-a.akamaihd.net\/profiles\/profile_53468298_75sq_1375408746.jpg",
					"id":"53468298",
					"full_name":"Madeleine"
			},
				"id":"585489054614679164"
			},
			{
				"created_time":"1391338716",
				"text":"Hahaha vilket sk\u00e4mt",
				"from":{
					"username":"nataliee85",
					"profile_picture":"https:\/\/igcdn-photos-h-a.akamaihd.net\/hphotos-ak-xap1\/t51.2885-19\/927768_619785758127031_1578368809_a.jpg",
					"id":"182036205",
					"full_name":"nataliee85"
			},
				"id":"646918501829701241"
			}]
		},
		"filter":"Normal",
		"created_time":"1383980378",
		"link":"https:\/\/instagram.com\/p\/gfBUi5L-82\/",
		"likes":{
			"count":12,
			"data":[{
				"username":"darkanna",
				"profile_picture":"https:\/\/igcdn-photos-a-a.akamaihd.net\/hphotos-ak-xfa1\/t51.2885-19\/11232695_1133376233354584_36561838_a.jpg",
				"id":"56115097",
				"full_name":""
				},
				{
					"username":"principessan",
					"profile_picture":"https:\/\/instagramimages-a.akamaihd.net\/profiles\/profile_53468298_75sq_1375408746.jpg",
					"id":"53468298",
					"full_name":"Madeleine"
				},
				{
					"username":"solitaryfago_",
					"profile_picture":"https:\/\/igcdn-photos-d-a.akamaihd.net\/hphotos-ak-xap1\/t51.2885-19\/10725087_836601373036955_113332001_a.jpg",
					"id":"191463353",
					"full_name":"Fredrik Jonsson"
			}]
		},
		"images":{
			"low_resolution":{
				"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/s320x320\/e15\/1171040_627866387252114_498980869_n.jpg",
				"width":320,
				"height":320
			},
			"thumbnail":{
				"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/s150x150\/e15\/1171040_627866387252114_498980869_n.jpg",
				"width":150,
				"height":150
			},
			"standard_resolution":{
				"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/e15\/1171040_627866387252114_498980869_n.jpg",
				"width":640,
				"height":640
			}
		},
		"users_in_photo":[],
		"caption":{
			"created_time":"1383980378",
			"text":"Matkasse v\u00e4rd 1200? Really #nackaforum #nackaforummatochvin \n@nackaforum\nSn\u00e4lla ber\u00e4tta hur kostnaderna \u00e4r f\u00f6rdelade p\u00e5 dessa varor.",
			"from":{
				"username":"immerone",
				"profile_picture":"https:\/\/instagramimages-a.akamaihd.net\/profiles\/profile_36998066_75sq_1334048017.jpg",
				"id":"36998066",
				"full_name":"SDGINFO"
			},
			"id":"585193263522114933"
		},
		"type":"image",
		"id":"585192286484164406_36998066",
		"user":{
			"username":"immerone",
			"profile_picture":"https:\/\/instagramimages-a.akamaihd.net\/profiles\/profile_36998066_75sq_1334048017.jpg",
			"id":"36998066",
			"full_name":"SDGINFO"
		}
	}
]}*/

