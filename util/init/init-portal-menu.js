
var universalDaoModule = require('./../../../registries/build/server/UniversalDao.js');
var mongoDriver = require('./../../../registries/build/server/mongoDriver.js');
var config = require('./../../../registries/build/server/config.js');



console.log('initializing data');

mongoDriver.init(config.mongoDbURI, function(err) {
	if (err) {
		throw err;
	}

	console.log(mongoDriver.getDb);

	var _dao_portalMenu = new universalDaoModule.UniversalDao(mongoDriver, {
		collectionName : "portalMenu"
	});
	var _dao_portalArticles = new universalDaoModule.UniversalDao(mongoDriver, {
		collectionName : "portalArticles"
	});
	
	//console.log(_dao_portalMenu.find({}));
	//_dao_portalMenu.drop();

	var menu = { //"_id" : ObjectId("54b7ba4a88f3ae5f58701db2"), 
			"index" :
				{ "name" : "ROOT", "transCode" : null, "tags" : [ "homepage" ],
					"subElements" : [
						{ "name" : "O Nás", "transCode" : null, "tags" : [ "about_rotary" ],
							"subElements" : [
								{ "name" : "Informácie", "transCode" : null, "tags" : [ "about_us" ], "subElements" : [ ] }, 
								{ "name" : "Organizácia", "transCode" : null, "tags" : [ "rotary_international" ], "subElements" : [ ] },
								{ "name" : "Oblasť", "transCode" : null, "tags" : [ "rotary_district" ], "subElements" : [ ] }, 
							]
						},
						{ "name" : "O klube", "transCode" : null, "tags" : [ "about_club" ],
							"subElements" : [
								{ "name" : "Vedenie klubu", "transCode" : null, "tags" : [ "management" ], "subElements" : [ ] },
								{ "name" : "Kontakt", "transCode" : null, "tags" : [ "contact" ], "subElements" : [ ] },
								{ "name" : "História klubu", "transCode" : null, "tags" : [ "historia" ], "subElements" : [ ] },
							]
						},
						{ "name" : "Zoznam členov", "transCode" : null, "tags" : [ "members_list" ],
							"subElements" : [
								{ "name" : "Členovia", "transCode" : null, "tags" : [ "special_members" ], "subElements" : [ ] }, 
								{ "name" : "Ako sa stať členom", "transCode" : null, "tags" : [ "membership" ], "subElements" : [ ] }
							]
						}, 
						{ "name" : "Projekty", "transCode" : null, "tags" : [ ], "subElements" : [ "projects" ] }, 
						{ "name" : "Fotogaleria", "transCode" : null, "tags" : [ ], "subElements" : [ "photogallery" ] },
						{ "name" : "Na stiahnutie", "transCode" : null, "tags" : [ ], "subElements" : [ "download" ] }
					]
				}
			}

	var article = { //"_id" : ObjectId("54b7d4b488f3ae5f58701dc3"), 
			"name" : "Article", "desc" : "Nadpis článku, každý článok by mal mať aspoň jeden nadpis. Nadpis článku sa používa ak ako link v zozname článkov", 
			"icon" : "img/block-title.png", 
			"meta" : { "template" : "article", "enabled" : true, "publishFrom" : "20150115", 
				"tags" : [ "about_rotary", "menu:index" ], "title" : "Unionsoft s.r.o.", 
				"lastModTimestamp" : 1421335288506 }, 
			"data" : [ 
			        { "meta" : { "type" : "pure-html", "name" : "title", "element" : "<div></div>" }, 
							"data" : "<h1>O spoločnosti</h1>" }, 
					{ "meta" : { "type" : "pure-html", "name" : "abstract", 
									"element" : "<section class=\"abstract\"></section>" }, 
								"data" : "Unionsoft je spoločnost tvoriaca software.." }, 
					{ "meta" : { "type" : "pure-html", "name" : "contentBlock", "element" : "<section class=\"content\"></section" },
									"data" : "<p>...Obsah článku...</p>" }
			]
		}


	_dao_portalMenu.delete( {}, function (err, data) {
		_dao_portalMenu.save(menu, function (err, data) {
			console.log ('Menu saved');
			mongoDriver.close();
			});
	});

	_dao_portalArticles.delete({},function (err,data){
		_dao_portalArticles.save(article, function (err, data) {
			console.log ('Article saved');
			mongoDriver.close();
			});
	});
});


