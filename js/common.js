$(function() {
	var stba = 0;
	$(".dataEstimate").on("click",function(e){
		if(stba>0 && !isNaN(stba)){
			$(".wrapper").css("display","none");
			$(".print-wrapper").css("display","block");
			$(".btn").on("click",function(){
				$(".print-wrapper").css("display","none");
				$(".wrapper").css("display","block");	
			});
		}else {
			e.preventDefault();
			$(".viewResult").text("Вы не ввели никаких данных для расчетов или не нажали кнопку Расчитать");
		}
			
	});

	$(".printme").on("click", function(){
		window.print();
	})


	// $('.dataEstimate').magnificPopup({
	// 	type: 'inline',
	// 	preloader: false,
	// 	focus: '#username',
	// 	modal: true
	// });
	// $(document).on('click', '.bctn', function (e) {
	// 	e.preventDefault();
	// 	$.magnificPopup.close();
	// });

	$(".dataResult").on("click",function(){
		var userWidth = $(".datawidth").val();//Заданная ширина
		var userLength = $(".datalength").val();//Заданная длина
		if(!isNaN(userWidth) && !isNaN(userLength) && userWidth>0 && userLength>0){
			var han = Math.round(0.35*userWidth); // Высота 
			var n = Math.round(userLength/0.61); // колво ламелей
			var l = parseFloat((n*0.61).toFixed(2));// Длинна которая будет по факту
			var sm2 = parseFloat((userWidth*l).toFixed(2));// Площадь
			var tst = 1.3;// ???
			var i = parseFloat((Math.sqrt((userWidth/2)*(userWidth/2) + (han*han))).toFixed(2)); // неясно что это
			var p = parseFloat(((2*i) + 0.3333*((2*i) - userWidth)).toFixed(1)); // длинна дуги арки
			var mLamel = parseFloat((0.914*tst*p*7.85*1.04).toFixed(1)); // Масса ламели
			var mArc = Math.round(mLamel*n); // масса арки
			var mTorc = Math.round((3.14*(userWidth*userWidth)/4)*tst*7.85*1.5); // масса торца
			var mAng = Math.round((mArc + mTorc)*1.14); // масса всего ангара
			var Stme = (mAng/1000)*19000; // CТОИМОСТЬ МЕТАЛА
			var dpr;// Прибыль предприятия
			var fzp;// Фонд заработной платы
			var nepr;// Непроизводственные расходы
			var kran = sm2*50; // услуги крана
			var komand = sm2*40; // командировочные
			if(sm2<500){
				dpr = 50000;
				nepr = 10000;
			}else if(500<=sm2 && sm2<1000){
				dpr = sm2*90;
				nepr = 20000;
			}else if(1000<=sm2 && sm2<1500){
				dpr = sm2*85;
				nepr = 30000;
			}else if(1500<=sm2 && sm2<2000){
				dpr = sm2*80;
				nepr = 40000;
			}

			if(sm2<500){
				fzp = 50000;
			}else{
				fzp = sm2*100;
			}

			stba = Stme+dpr+fzp+nepr+kran+komand; // Cтоимость ангара
			var stba1m2 = parseFloat((stba/sm2).toFixed(1)); // цена за метр квадратный

			$(".viewResult").text(stba + " грн");
			$(".viewmetr").text(stba1m2 + " грн/м2");

			$("td.cell.han").text(han);
			$("td.cell.n").text(n);
			$("td.cell.l").text(l);
			$("td.cell.sm2").text(sm2);
			$("td.cell.sm2").text(sm2);
			$("td.cell.p").text(p);
			$("td.cell.mArc").text(mArc);
			$("td.cell.mTorc").text(mTorc);
			$("td.cell.mAng").text(mAng);
			$("td.cell.Stme").text(Stme);
			$("td.cell.mAng").text(mAng);
			$("td.cell.dpr").text(dpr);
			$("td.cell.fzp").text(fzp);
			$("td.cell.nepr").text(nepr);
			$("td.cell.kran").text(kran);
			$("td.cell.komand").text(komand);
			
		}else {
			$(".viewResult").text("Данные должны быть числом и больше чем 0");
			$(".viewmetr").text("");

			$(".datawidth").val("");
			$(".datalength").val("");
		}

	});


});
