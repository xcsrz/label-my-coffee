(function() {
    // scoped variables

    var canvas = document.getElementById("labelDesign");
    var ctx = canvas.getContext('2d');
    var printCanvas = document.getElementById('sidewaysLabel');
    var printCtx = printCanvas.getContext('2d');
    // printCtx.rotate(-90);
    var bgcolor = '#fefefa';
    var fgcolor = '#337733';
    var fontName = 'Montserrat';
    var labelHeight = 12;
    var contentHeight = 30;
    var boxHeight = 40;
    var boxWidth = 70;

    var decaf_options = {
        "X": "Decaf",
        "1/2": "Half Decaf",        
    };

    var labelSpecs = {
        "5161/5261/5961/8161" : {
            width:      4,
            height:     1, 
            top:        0.5,
            left:       0.175,
            hgap:       0.1562,
            vgap:       0,
        },
        "5026" : {
            width:      3.4375,
            height:     0.9375,
            top:        0.5112,
            left:       0.4976,
            hgap:       0.6299,
            vgap:       0.1925,
        },
        "5160/5260/5960/5970/5971/5972/5979/5980/8160/8460" : {
            width:      2.5935,
            height:     1,
            top:        0.5,
            left:       0.2198,
            hgap:       0.14,
            vgap:       0,
        },
        "5066/5202/5266/5366/8366" : {
            width:      3.434,
            height:     0.669,
            top:        0.4825,
            left:       0.5347,
            hgap:       0.5625,
            vgap:       0,
        },
        "6571" : {
            width:      3,
            height:     0.625,
            top:        0.5,
            left:       0.8415,
            hgap:       0.817,
            vgap:       0,
        },
    }
    // set a default
    var chosenLabel = labelSpecs["5066/5202/5266/5366/8366"];

    var syrup_options = {
        "A":    "Almond",
        "C":    "Caramel Syrup",
        "CH":   "Chai",
        "CL":   "Classic Syrup",
        "CN":   "Cinnamon",
        "H":    "Hazelnut",
        "I":    "Irish Cream",
        "MO":   "Mocha Syrup",
        "P":    "Peppermint",
        "R":    "Raspberry",
        "SFH":  "Sugar Free Hazelnut",
        "SFV":  "Sugar Free Vanilla",
        "V":    "Vanilla",
        "VA":   "Valencia",
        "WM":   "White Chocolate Mocha Syrup",
    };

    var milk_options = {
        "B":   "Breve (half-and-half)",
        "E":   "Eggnog (seasonal)",
        "%":   "50% whole, 50% non-fat",
        "N":   "Nonfat",
        "S":   "Soy",
        "O":   "Organic Milk",
    };

    var custom_options = {
        "CHIP?":     "Add chips",
        "CR?":       "Caramel Sauce",
        "D?":        "Dry",
        "DB?":       "Double Blended",
        "F?":        "Foamy",
        "H?":        "Hot",
        // "K":        "Kid’s Beverage (tiny size, cooler temperature)",
        "K":        "Kid’s Beverage",
        // "LT":       "Light (used before another code)",
        "-H2O":      "No Water",
        "SL?":       "Sweet’n Low",
        "SP?":       "Splenda",
        "STRAB?":    "Strawberry Fruit Sauce",
        "SR?":       "Sugar in the raw",
        "VBEAN?":    "Vanilla Bean Powder",
        "W?":        "Wet",
        "WC?":       "Whipped Cream",
        // "X":        "Extra",
        "=?":        "Equal",
    };

    var drink_options = {
        "Standard": {
            "A":        "Caffe Americano",
            "AL":       "Cafe au Lait",
            "BC":       "Brewed Coffee",
            "C":        "Cappuccino",
            "CAC":      "Caramel Apple Cider",
            "CB":       "Caramel Brule Latte",
            "CH":       "Tazo Chai Tea Latte",
            "CHEG":     "Tazo Chai Eggnog Tea Latte",
            "CM":       "Caramel Macchiato",
            "E":        "Espresso",
            "ECP":      "Espresso Con Panna",
            "EGTL":     "Earl Grey Tea Latte (aka “London Fog”)",
            "EM":       "Espresso Macchiato",
            "EL":       "Eggnog Latte",
            "GL":       "Gingerbread Latte",
            "HC":       "Hot Chocolate",
            "L":        "Caffe Latte",
            "LM":       "Latte Macchiato",
            "M":        "Caffe Mocha",
            "MIS":      "Caffe Misto",
            "MV":       "Mocha Valencia",
            "PM":       "Peppermint Mocha",
            "PSL":      "Pumpkin Spice Latte",
            "PWM":      "Peppermint White Chocolate Mocha",
            "SCID":     "Steamed Cider",
            "SCR":      "Syrup Creme",
            "SKM":      "Skinny Mocha",
            "SM":       "Steamed Milk",
            "T":        "Tazo Tea",
            "VCR":      "Vanilla Cream",
            "WHC":      "White Hot Chocolate",
            "WM":       "White Chocolate Mocha",
            "CHA":      "Chantico",
        },
        "Blended": {
            "CBF":      "Caramel Brule Frappuccino",
            "CF":       "Coffee",
            "CVF":      "Caffe Vanilla",
            "CRF":      "Caramel",
            "E":        "Espresso",
            "EF":       "Eggnog Frappuccino",
            "GF":       "Gingerbread Frappuccino",
            "JCF":      "Java Chip",
            "MF":       "Mocha",
            "PMF":      "Peppermint Mocha Frappuccino",
            "PSF":      "Pumpkin Spice Frappuccino",
            "PWMF":     "Peppermint White Chocolate Mocha Frappuccino",
            "WMF":      "White Chocolate Mocha Frappuccino",
            "CHCF":     "Tazo Chai Creme",
            "DCCF":     "Double Chocolate Chip",
            "STCF":     "Strawberries & Creme",
            "SF":       "Syrup Creme",
            "VBF":      "Vanilla Bean",
        },
        "Iced": {
            "IC":       "Iced Coffee",
            "BT/PT":    "Iced Black Tea / Iced Passion Tea",
            "BTL":      "Iced Black Tea Lemonade",
            "PTL":      "Iced Passion Tea Lemonade",
        },
    }

    var modifierOptions = {
        "": "norm",
        "X": "extra",
        "-": "no",
        "Lt": "light",
    }

    var activateJquery = function() { 
        $('.selectable').selectable({
            selected: buildLabel,
            unselected: buildLabel,
        });
        $('#drink-type-select').selectmenu({
            change: function() {
                populateDrinkContainer();
            }
        });
        $('#selected-size').selectmenu({
            change: buildLabel,
        });
        $('.modifier-dropdown').change(buildLabel);
        $('#start-over').click(function() {
            $('ul.selectable li.ui-selected').removeClass('ui-selected');
            buildLabel();
        });
        $('#size-test').click(function() {
            resizeLabel(150,700);
        });
        $('#download-vertical-btn').click(function(){
            this.href = canvas.toDataURL();
            this.download = 'coffee-label.png';
        });
        $('#download-horizontal-btn').click(function(){
            this.href = printCanvas.toDataURL();
            this.download = 'coffee-label.png';
        });
        $('#print-btn').click(printLabel);
    }

    var selectionTitle = function(name) {
        title = document.createElement('h4');
        title.className = "clearfix";
        title.appendChild(document.createTextNode(name));
        return title;
    }

    var optionColumn = function() {
        var holder = document.createElement('div');
        holder.className = 'col-sm-4'; 
        return holder;
    }

    var buildOptionList = function(name, list, id) {
        var holder = document.createElement('div');
        if(name) {
            holder.appendChild(selectionTitle(name));
        }
        var options = document.createElement('ul');
        if(id) {
            options.id = id + "-selector";
        }
        options.className = 'selectable';
        Object.keys(list).forEach(function(key){
            var opt = document.createElement('li');
            var mods = false;
            var text = list[key];
            if(key.charAt(key.length-1) == '?') {
                mods = true;
                key = key.slice(0,key.length-1);
            } 
            opt.dataset.value = key;
            opt.className = 'ui-widget-content';
            opt.appendChild(document.createTextNode(text));
            if(mods) {
                var modSel = document.createElement('select');
                modSel.className = "modifier-dropdown";
                Object.keys(modifierOptions).forEach(function(mk){
                    var modOpt = document.createElement('option');
                    modOpt.value = mk;
                    modOpt.appendChild(document.createTextNode(modifierOptions[mk]));
                    modSel.appendChild(modOpt);
                });
                opt.appendChild(modSel);
            }
            options.appendChild(opt);
        });
        holder.appendChild(options);

        return holder;
    }

    var populateDrinkContainer = function() {
        var drinkContainer = document.getElementById('Drink-selector');
        drinkContainer.innerHTML = '';
        var type = $('#drink-type-select').val();
        console.log(type);
        drinkContainer.appendChild(buildOptionList(null, drink_options[type], type));
        activateJquery();
    }

    var populateLabelOptions = function() {
        var holder = document.getElementById('label-option-dropdown');
        Object.keys(labelSpecs).forEach(function(key) {
            var opt = document.createElement('li');
            var link = document.createElement('a');
            link.appendChild(document.createTextNode(key));
            link.onclick = function() {
                chosenLabel = labelSpecs[key];
                buildLabel();
            }
            opt.appendChild(link);
            holder.appendChild(opt);
        });
    }

    var resizeLabel = function(w,h) {
        canvas.width = w;
        canvas.height = h;
        buildLabel();
    }

    var buildDrinkSelect = function() {
        drinkBox = document.createElement('div');
        drinkType = document.createElement('select');
        drinkType.id = 'drink-type-select';
        Object.keys(drink_options).forEach(function(key) {
            var opt = document.createElement('option');
            opt.value = key;
            opt.appendChild(document.createTextNode(key + " Drinks"));
            drinkType.appendChild(opt);
        });
        drinkBox.appendChild(drinkType);
        drinkContainer = document.createElement('div');
        drinkContainer.id = 'Drink-selector';
        drinkBox.appendChild(drinkContainer);
        return drinkBox;
    }

    var shotsForm = function() {
        var form = document.createElement('div');
        var label = document.createElement('h4')
        label.appendChild(document.createTextNode('Shots'));
        label.className = "col-sm-4 shot-label";
        form.appendChild(label);
        var list = document.createElement('ul')
        list.id = 'Shots-selector';
        list.className = "selectable shot-list col-sm-8";
        for (var i = 1; i <= 4; i++) {
            var shot = document.createElement('li');
            shot.appendChild(document.createTextNode(i));
            shot.className="col-sm-2 ui-widget-content";
            shot.dataset.value = i;
            shot.style.textAlign = "center";
            list.appendChild(shot);
        };
        form.appendChild(list);
        return form;
    }

    // build options UI
    optionsContainer = document.getElementById('labelOptions');

    // column 1
    var column = optionColumn();
        column.appendChild(buildDrinkSelect());
    optionsContainer.appendChild(column);

    // column 2
    var column = optionColumn();
        column.appendChild(buildOptionList('Caffeine Selection', decaf_options, "Decaf"))
        column.appendChild(shotsForm())
        column.appendChild(buildOptionList('Custom Selection', custom_options, "Custom"));
    optionsContainer.appendChild(column);

    // column 3
    var column = optionColumn();
        column.appendChild(buildOptionList('Milk Selection', milk_options, "Milk"))
        column.appendChild(buildOptionList('Syrup Selection', syrup_options, "Syrup"));
    optionsContainer.appendChild(column);
    
    // populate drink selections
    populateDrinkContainer();

    // populate label selection dropdown
    populateLabelOptions();

    var drawLabel = function(y, label) {
        // ctx.textBaseline = 'top';
        ctx.font = labelHeight + "px " + fontName;
        ctx.fillStyle = fgcolor;
        ctx.fillText(label, canvas.width / 2, y + labelHeight/2);
        ctx.fillStyle = bgcolor;
        return labelHeight * 1.5    ;
    };
    var fillContent = function(y, content) {
        var height = boxHeight - 6;
        ctx.font = height + "px " + fontName;
        while (ctx.measureText(content).width > boxWidth) {
            height--
            ctx.font = height + "px " + fontName;
        }
        ctx.fillStyle = fgcolor;
        if(content.charAt(0) == '-') {
            content = content.slice(1)
            var currentLineWidth = ctx.lineWidth;
            ctx.lineWidth = 8;
            var lineWidth = ctx.measureText(content).width;
            ctx.beginPath();
            ctx.moveTo(
                (canvas.width - lineWidth)/2,
                y + (boxHeight /2) + (boxHeight/10)
            );
            ctx.lineTo(
                canvas.width - ((canvas.width - lineWidth)/2),
                y + (boxHeight /2) - (boxHeight/10)
            );
            ctx.stroke();
            ctx.lineWidth = currentLineWidth;
        }
        ctx.fillText(content, canvas.width / 2, y + (boxHeight /2));
        ctx.fillStyle = bgcolor;        
    };

    var drawSize = function(y) {
        size = document.getElementById('selected-size').value;
        ctx.font = "Bold " + (labelHeight*1.5) + "px " + fontName;
        ctx.fillStyle = fgcolor;
        ctx.fillText(size, canvas.width / 2, y + labelHeight/2);
        ctx.fillStyle = bgcolor;
        return y + (labelHeight * 1.8);        
    }

    var drawBox = function(y, label, content) {
        // console.log("before label, Y is " + y);
        y += drawLabel(y, label);
        // console.log("before content, Y is " + y);
        // console.log("before box, Y is " + y);
        ctx.beginPath();
        ctx.rect(10, y, boxWidth, boxHeight);
        ctx.fill();        
        ctx.stroke();
        fillContent(y, content);
        return y + boxHeight;
    };

    var buildLabel = function() {
        ctx = canvas.getContext('2d'); // refresh
        // intentially reversing width and height because labels print sideways
        canvas.height = (canvas.width * chosenLabel.width) / chosenLabel.height;
        canvas.width = canvas.width; // bizarre that this is still the accepted way to clear the canvas first
        // var ctx = canvas.getContext('2d');
        // var slot = (canvas.height - 20) / 8;
        // labelHeight = slot / 5;
        // boxHeight = ((canvas.height - labelHeight) / 6) - (labelHeight * 2.5); // padding between box and next label is label height and padding between label and corresponding box is half label height

        var slot = (canvas.height - 20) / 41;
        labelHeight = slot;
        boxHeight = slot * 4;

        boxWidth = canvas.width - 20; // 10 px padding on the sides

        // defaults
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = bgcolor;
        ctx.strokeStyle = fgcolor;
        ctx.lineWidth = 2.25;

        var y = drawSize(labelHeight);
        console.log('running boxes');
        ["Decaf", "Shots", "Syrup", "Milk", "Custom", "Drink"].forEach(function(box){
            // console.log('#' + box + '-selector li.ui-selected');
            value = "";
            if($('#' + box + '-selector li.ui-selected').size() > 0) {
                value = $('#' + box + '-selector li.ui-selected').attr('data-value');
                if($mod = $('#' + box + '-selector li.ui-selected select.modifier-dropdown')) {
                    if($mod.val() != undefined && $mod.val() != ""){
                        value = $mod.val() + value;
                    }
                }
            }
            y = drawBox(y, box, value) + labelHeight; // padding between box and next label is label height
        });
        rotateLabel();
    }

    var rotateLabel = function() {
        printCanvas.width = canvas.height;
        printCanvas.height = canvas.width;
        printCtx.translate(0,printCanvas.height);
        printCtx.rotate(-90*Math.PI/180);
        printCtx.drawImage(canvas, 0, 0);
    }

    var printLabel = function() {
        var imageSrc = printCanvas.toDataURL();
        var pdf = new jsPDF('p', 'in', 'letter');
        pdf.addImage(imageSrc, 'PNG', chosenLabel.left, chosenLabel.top, chosenLabel.width, chosenLabel.height);
        pdf.save('coffee-label.pdf');
    }

    buildLabel();

    // jQuery UI activation
    activateJquery();

})();




