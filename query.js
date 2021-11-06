var melompat = false
var ketinggian = 0
var popupKe = 0
var tombolTutupPopup = '<button id="tutupInfo">tutup</button>'
var banyakData = garis.length
var jalan = false

$(document).ready(function () {
	$('#peringatan').hide()
	setTimeout(function () {
		$('#sambutan1').show(200)
		setTimeout(function () {
			$('#sambutan2').show(200)
			setTimeout(function () {
				$('#sambutan3').show(200)
				setTimeout(function () {
					$('#sambutan4').show(200)
					setTimeout(function () {
						$('#sambutan5').show(200)
						setTimeout(function () {
							$('#sambutan6').show(200)
							setTimeout(function () {
								$('#sambutan7').show(200)
								setTimeout(function () {
									$('#sambutan99').show(200)
								}, 700)
							}, 700)
						}, 700)
					}, 700)
				}, 700)
			}, 700)
		}, 700)
	}, 700)

	// klik mulai
	$('#sambutan99').click(function () {
		$('#splash').hide(1000)
		$('#game').show(1500, function() {
			jalan = true
		})
		$('#g0').css({'bottom': garis[0]+'vh', 'opacity': 1})
		$('#g1').css({'bottom': garis[1]+'vh', 'opacity': .7})
		$('#g2').css({'bottom': garis[2]+'vh', 'opacity': 1})
	})
	$(document).click(function () {
		if (jalan) {mulaiKlik()}
	})
})

function mulaiKlik() {
	if (!melompat) {
		lompat()
	} else {
		melompat = false
	}
}

function lompat() {
	melompat = true
	ketinggian = 0
	$('#pelompat').stop().css({'bottom': ketinggian+'vh'}).animate({
		'height': '3vh'
	}, 300)
	$('.meter').show(100)
	kekuatanMelompat()
}

function berhentiLompat() {
	$(document).off('click')
	$('.meter').hide()
	$('#pelompat').animate({
		'height': '5vh'
	}, 100)
	$('#pelompat').animate({
		'bottom': ketinggian+'vh'
	}, 1000, function () {
		if (ketinggian < garis[1] || ketinggian > garis[2]-5) {
			$('#pelompat').animate({
				'bottom': 1+'vh'
			}, 300, function () {
				$(document).on('click', mulaiKlik)
			})
		} else {
			$('#pelompat').animate({
				'bottom': garis[1]+1+'vh'
			}, 300, function () {
				$('#g0').animate({'bottom': '-'+garis[1]+'vh', 'opacity': 0}, 500)
				$('#g1').animate({'bottom': '0vh', 'opacity': 1}, 500)
				if (banyakData > 2) {$('#g2').animate({'bottom': garis[2]-garis[1]+'vh', 'opacity': .7}, 500)}
				$('#pelompat').animate({
					'bottom': '1vh'
				}, 500, function () {
					barisKe1 = garis[1]
					if (banyakData > 3) {
						for (var i = 0; i < banyakData-2; i++) {
							garis[i] = garis[i+1]-barisKe1
						}
						garis.pop()
						banyakData = garis.length
						$('#g0').css({'bottom': garis[0]+'vh', 'opacity': 1})
						$('#g1').css({'bottom': garis[1]+'vh', 'opacity': .7})
						$('#g2').css({'bottom': garis[2]+'vh', 'opacity': 1})
						$('#judulPopup').html(info[popupKe][0])
						$('#isiPopup').html(info[popupKe][1]+' '+tombolTutupPopup)
						popupKe += 1
						$('#popup').show(300)
						$('#tutupInfo').on('click', function () {
							$('#popup').hide(300, function() {
								$(document).on('click', mulaiKlik)
							})							
						})
						
					} else if (banyakData == 3) {
						garis[0] = 0
						garis[1] = garis[2]-barisKe1
						garis.pop()
						banyakData = garis.length
						$('#g0').css({'bottom': garis[0]+'vh', 'opacity': 1})
						$('#g1').css({'bottom': garis[1]+'vh', 'opacity': .7})
						$('#g2').css({'display': 'none'})
						$('#judulPopup').html(info[popupKe][0])
						$('#isiPopup').html(info[popupKe][1]+' '+tombolTutupPopup)
						popupKe += 1
						$('#popup').show(300)
						$('#tutupInfo').on('click', function () {
							$('#popup').hide(300, function() {
								$(document).on('click', mulaiKlik)
							})							
						})
					} else {
						$('#g0').css({'bottom': 0+'vh', 'opacity': 1})
						$('#g1').css({'display': 'none'})
						$('#selesai').show().animate({
							'height': '100vh'
						}, 5000)
					}
				})
			})
		}
	})
}

function kekuatanMelompat() {
	ketinggian += 1
	$('#meterDalam').css({
		'height': ketinggian * 30 / 80 + 'vh'
	})
	cekMelompat()
}

function cekMelompat() {
	if (melompat && ketinggian < 80) {
		setTimeout(kekuatanMelompat, 100)
	} else {
		berhentiLompat()
	}
}

