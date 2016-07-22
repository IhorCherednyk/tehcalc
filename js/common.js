$(function() {
	
	$(".dataEstimate").on("click",function(){

		$(".wrapper").css("display","none");
		$(".printSection").css("display","block");
		$(".btn").on("click",function(){
			$(".printSection").css("display","none");
			$(".wrapper").css("display","block");	
		});
		window.print();
			
	});

	$(".dataResult").on("click",function(){
		var userWidth = $(".datawidth").val();//Заданная ширина
		var userLength = $(".datalength").val();//Заданная длина
		if(!isNaN(userWidth) && !isNaN(userLength) && userWidth>0 && userLength>0){
			var han = 0.35*userWidth; // Высота 
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

			var stba = Stme+dpr+fzp+nepr+kran+komand; // Cтоимость ангара
			var stba1m2 = parseFloat((stba/sm2).toFixed(1)); // цена за метр квадратный

			$(".datawidth").val("");
			$(".datalength").val("");

			$(".viewResult").text(stba + " грн");
			$(".viewmetr").text(stba1m2 + " грн/м2");

		}else {
			$(".viewResult").text("Данные должны быть числом и больше чем 0");
			$(".viewmetr").text("");

			$(".datawidth").val("");
			$(".datalength").val("");
		}

	});


});
