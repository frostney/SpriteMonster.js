/**
 *
 *	SmokeMonster.js
 *
 *	What is SmokeMonster?
 *		SmokeMonster is John Locke, or is he?
 *		But seriously, SmokeMonster.js is a small graphics library based on DOM
 *
 *  Why SmokeMonster?
 *		Well, there had to be some kind of nemesis on the island, right?
 *		But seriously, we here at Freeze Development have been making video games
 *		for over two centuries and with our...
 *		But seriously seriously we are working on ElysionWeb, a HTML5 game framwork
 *		using Canvas, WebGL and SVG/VML with Raphael as its rendering backends.
 *		So want if you want to use the DOM to put together some small simple game
 *		you are doomed if you wanted to use ElysionWeb here. Well, "dommed" is such 
 *    a strong word here. ;)
 *    
 *    This is what SmokeMonster was made for:
 *      It's a tiny web graphics library based on nano.js
 *    
 *    You can make quick and simple Javascript games based on DOM. 
 *    But you should definitely give ElysionWeb a try once it's finished.
 * 
 *    
 *
 *  How is SmokeMonster?
 *  	Oh, you wanna see how it's done? Here ya go:
 *			You don't need to initialize
 *
 *
 *      var mySprite = new SmokeMonster.Sprite();
 *      mySprite.loadFromFile("freckles.png");
 *      mySprite.position.make(50, 50);
 *      mySprite.draw();
 * 
 *      This will draw mySprite at x: 50 and y: 50.
 * 
 *      SmokeMonster.GUI.drawRect(new SmokeMonster.Rect(10, 10, 300, 300));
 * 
 * 
 *  This whole SmokeMonster thing was made in just a few days.
 *  There won't probably be much new features after this initial relase, as
 *  we will concentrate our efforts on ElysionWeb. There may be a bug fix release
 *  if users find some nasty bugs.
 * 
 * 
 *  License:
 *  Copyright (C) 2011 by Johannes Stein, Freeze Development (http://www.freeze-dev.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

// SmokeMonster namepace - He is coming for you next (I really need to quit on the Lost references, right?)
if (typeof SmokeMonster == 'undefined') var SmokeMonster = {};

var objectCount = 0;

function createNewUniqueID(objectName)
{
	objectCount++;
	return objectName + "-" + ("00000" + objectCount).slice(-5);
}

/**
 *
 * SmokeMonster General functions
 *
 */

SmokeMonster.add = function(parentObject, childObject)
{
    if (typeof parentObject == "string")
        document.getElementsByTagName(parentObject)[0].appendChild(childObject);
    else
        parentObject.appendChild(childObject);
}

SmokeMonster.remove = function(parentObject, childObject)
{
    if (typeof parentObject == "string")
        document.getElementsByTagName(parentObject)[0].removeChild(childObject);
    else
        parentObject.removeChild(childObject);
}


/**
 * 
 * SmokeMonster Types
 * 
 */

// Color
SmokeMonster.Color = function(r, g, b, a)
{
  // Private
  var fAlpha = 0;
  
  // Public
  
  // Constructor
  if ((typeof(r) !== "undefined") && 
    (typeof(g) === "undefined") && 
    (typeof(b) === "undefined")) // <-- Not really necessary, just so you know what I'm doing here
  {
    this.r = r;
    this.g = r;
    this.b = r;
    this.a = 1;
  }
  else
  {
    this.r = (typeof(r) === "undefined") ? 0 : r;
    this.g = (typeof(g) === "undefined") ? 0 : g;
    this.b = (typeof(b) === "undefined") ? 0 : b;
    this.a = (typeof(a) === "undefined") ? 1 : a;
  }
  
  // Returns Javascript Color Code
  this.get = function()
  {
    if ((a > 0) && (a < 1)) return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
    
    if ((a > 1) && (a < 255))
    {
      fAlpha = a / 255;
      return "rgba("+this.r+","+this.g+","+this.b+","+fAlpha+")";
    }
    else return "rgb("+this.r+","+this.g+","+this.b+")";
  }
  
  this.toString = function()
  {
    return this.get();  
  }
  
  this.toHex = function()
  {
    return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
  }

  this.make = function(newR, newG, newB, newA)
  {
    this.r = (typeof(newR) === "undefined") ? this.r : newR;
    this.g = (typeof(newG) === "undefined") ? this.g : newG;
    this.b = (typeof(newB) === "undefined") ? this.b : newB;
    this.a = (typeof(newA) === "undefined") ? this.a : newA;
  }
  
};

SmokeMonster.PositionType =
{
  ptPixel: 0,
  ptPercent: 1
}

SmokeMonster.Vector = function(x, y, z)
{
  // Public
  this.type = SmokeMonster.PositionType.ptPixel;
  
  // Constructor
  this.x = (typeof(x) === "undefined") ? 0.0 : x;
  this.y = (typeof(y) === "undefined") ? 0.0 : y;
  this.z = (typeof(z) === "undefined") ? 0.0 : z;
  
  // Vector to String
  this.toString = function()
  {
    return "X: " + this.x + "; Y: " + this.y + "; Z: " + this.z;
  }
  
  this.multiply = function(multi)
  {
    this.x = this.x * multi;
    this.y = this.y * mulit;
    this.z = this.z * multi;
  }

  this.make = function(newX, newY, newZ)
  {
    this.x = (typeof(newX) === "undefined") ? this.x : newX;
    this.y = (typeof(newY) === "undefined") ? this.y : newY;
    this.z = (typeof(newZ) === "undefined") ? this.z : newZ;
  }
};

SmokeMonster.Rect = function(x, y, w, h)
{
   // Public
  
  // Constructor
  this.x = (typeof(x) === "undefined") ? 0 : x;
  this.y = (typeof(y) === "undefined") ? 0 : y;
  this.w = (typeof(w) === "undefined") ? 0 : w;
  this.h = (typeof(h) === "undefined") ? 0 : h;
  
  // Rect to String
  this.toString = function()
  {
    return "X: " + this.x + "; Y: " + this.y + "; W: " + this.w + "; H: " + this.h;
  }
  
  this.get = function()
  {
    return "rect(" + this.x + "px, " + this.y + "px, " + this.w + "px, " + this.h + "px)";
  }
  
  this.area = function()
  {
    return (2 * this.w + 2 * this.h); 
  }

  this.empty = function()
  {
  	if ((this.x == 0) && (this.y == 0) && (this.w == 0) && (this.h == 0))
      return true;
    else
      return false;
  }

  this.make = function(newX, newY, newW, newH)
  {
    this.x = (typeof(newX) === "undefined") ? this.x : newX;
    this.y = (typeof(newY) === "undefined") ? this.y : newY;
    this.w = (typeof(newW) === "undefined") ? this.w : newW;
    this.h = (typeof(newH) === "undefined") ? this.h : newH;
  }
  
};

SmokeMonster.Screen = function()
{
	var width = 0,
    	height = 0;

	this.getSize = function()
    {

    }

    this.width = width;
    this.height = height;
}



SmokeMonster.Texture = function()
{
  // Public
  this.img = new Image();
  
  this.width = 0;
  this.height = 0;
  
  this.loaded = false;
  this.error = false;
  
  this.src = "";
  
  this.loadFromFile = function(aFilename)
  {
    this.src = aFilename;
    this.img.src = aFilename;
    
    this.width = this.img.width;
    this.height = this.img.height;
    
    this.img.onload = function()
    {
      this.loaded = true;
      this.error = false;
    }

    this.img.onerror = function()
    {
      this.loaded = false;
      this.error = true;
    }
  }
};

SmokeMonster.Container = function(parentNode)
{
	var styleText = "";

    // Public
    if (typeof parentNode == "undefined") this.parent = null;
  	  else this.parent = parentNode;

    this.id = createNewUniqueID("container");
    this.instance = document.createElement("div");
    this.instance.id = this.id;

    SmokeMonster.add('body', this.instance);

    this.alpha = 255;
    this.angle = 0.0;
    this.position = new SmokeMonster.Vector();

    this.width = 50;
    this.height = 50;

    this.visible = true;

    this.draw = function()
    {

    }
}

SmokeMonster.ImageOffset = function()
{
  this.position = new SmokeMonster.Vector();
  this.rotation = new SmokeMonster.Vector(50, 50);
  this.rotation.type = SmokeMonster.PositionType.ptPercent;
}

SmokeMonster.Sprite = function(parentNode)
{
  // Private
  var styleText = "";

  // Public
  if (typeof parentNode == "undefined") this.parent = null;
  	else this.parent = parentNode;

  this.id = createNewUniqueID("sprite");

  this.instance = document.createElement("div");
  this.instance_img = document.createElement("img");

  this.instance.id = this.id;
  this.instance_img.id = "img-" + this.id;

  SmokeMonster.add(this.instance, this.instance_img);
  SmokeMonster.add('body', this.instance);


  this.alpha = 255;
  this.angle = 0.0;
  this.clipRect = new SmokeMonster.Rect();
  this.offset = new SmokeMonster.ImageOffset();
  this.position = new SmokeMonster.Vector();
  this.scale = new SmokeMonster.Vector(1.0, 1.0);
  this.scaleClipRect = true;
  this.texture = new SmokeMonster.Texture();

  this.width = 0;
  this.height = 0;

  this.visible = true;

  
  this.loadFromFile = function(aFilename, aClipRect)
  {
    this.texture.loadFromFile(aFilename);

    this.instance_img.src = this.texture.src;

    this.width = this.texture.width;
    this.height = this.texture.height;

    if (typeof aClipRect != "undefined")
    	this.clipRect = aClipRect;
  }
  
  this.loadFromTexture = function(aTexture, aClipRect)
  {
    this.texture = aTexture;

    this.width = aTexture.width;
    this.height = aTexture.height;

    if (typeof aClipRect != "undefined")
    	this.clipRect = aClipRect;
  }
  
  this.draw = function()
  {
    //if (this.instance_img.src == "") return;
    //if (!this.texture.loaded) return;

    // If someone tries to trick the Smoke monster and change the width or height
    // the smoke monster tricks you and _actually_ scales the image... Muhahaha
    // (width and height are usually supposed to be read-only properties)
    if (this.width != this.texture.width)
    {
      this.scale.x = (this.width / this.texture.width);
      this.width = this.texture.width; //< Smoke Monster tricks you again and resets width :)
    }
    if (this.height != this.texture.height)
    {
      this.scale.y = (this.height / this.texture.height);
      this.height = this.texture.height; //< Smoke Monster tricks you again and resets height :)
    }
    // Btw: It is nice to be able to personify a piece of software


    // Reset style to reapply style
    if (styleText != "") styleText = "";

    if (!this.visible) styleText = styleText + "display:none;";

    if (this.alpha != 255)
      styleText = styleText + "filter:alpha(opacity=" + this.alpha + "); -moz-opacity:" + (this.alpha / 255) + "; -khtml-opacity:" + (this.alpha / 255) + "; opacity:" + (this.alpha / 255) + "; ";

    if ((this.angle / 360) != 0)
      styleText = styleText + "-webkit-transform: rotate(" + this.angle + "deg); -moz-transform: rotate(" + this.angle + "deg); -o-transform: rotate(" + this.angle + "); rotation:" + this.angle + "deg;";

    if ((this.position.x != 0) || (this.position.y != 0))
    {
      if (this.parent)
      	styleText = styleText + "position:relative;";
      else
      	styleText = styleText + "position:absolute;";

      if (this.position.x != 0)
      {
        switch (this.position.type)
        {
          case SmokeMonster.PositionType.ptPixel:
          {
            var margin = 0;

            if (this.offset.position.x != 0)
            {
              switch (this.offset.position.type)
              {
                case SmokeMonster.PositionType.ptPixel:
              	  margin = this.offset.position.x; break;
                case SmokeMonster.PositionType.ptPercent:
                  margin = (this.offset.position.x / 100) * (this.width * this.scale.x); break;
              }
            }

            styleText = styleText + "left:" + (this.position.x - margin) + "px;";
            break;
          }
          case SmokeMonster.PositionType.ptPercent:
          {
            var margin = 0;

            if (this.offset.position.x != 0)
            {
              switch (this.offset.position.type)
              {
                case SmokeMonster.PositionType.ptPixel:
              	  margin = (this.offset.position.x / this.width) * 100; break;
                case SmokeMonster.PositionType.ptPercent:
                  margin = (this.offset.position.x / 100); break;
              }
            }

            styleText = styleText + "left:" + (this.position.x - margin) + "%;";
            break;
          }
        }
      }
      if (this.position.y != 0)
      {
        switch (this.position.type)
        {
          case SmokeMonster.PositionType.ptPixel:
          {
            var margin = 0;

            if (this.offset.position.y != 0)
            {
              switch (this.offset.position.type)
              {
                case SmokeMonster.PositionType.ptPixel:
              	  margin = this.offset.position.y; break;
                case SmokeMonster.PositionType.ptPercent:
                  margin = (this.offset.position.y / 100) * (this.height * this.scale.y); break;
              }
            }

            styleText = styleText + "top:" + (this.position.y - margin) + "px;";
            break;
          }
          case SmokeMonster.PositionType.ptPercent:
          {
            var margin = 0;

            if (this.offset.position.y != 0)
            {
              switch (this.offset.position.type)
              {
                case SmokeMonster.PositionType.ptPixel:
              	  margin = (this.offset.position.y / this.height) * 100; break;
                case SmokeMonster.PositionType.ptPercent:
                  margin = (this.offset.position.y / 100); break;
              }
            }

            styleText = styleText + "top:" + (this.position.y - margin) + "%;";
            break;
          }
        }
      }
    }
    if (this.position.z != 0)
      	styleText = styleText + "z-index:" + this.position.z + "; ";
    if (!this.clipRect.empty())
    {
    	if (this.scaleClipRect)
        	styleText = styleText + "clip:rect(" + this.clipRect.y * this.scale.y + "px, " + (this.clipRect.w + this.clipRect.x) * this.scale.x + "px, " + (this.clipRect.h + this.clipRect.y) * this.scale.y + "px, " + this.clipRect.x * this.scale.x + "px); ";
        else
    		styleText = styleText + "clip:rect(" + this.clipRect.y + "px, " + (this.clipRect.w + this.clipRect.x) + "px, " + (this.clipRect.h + this.clipRect.y) + "px, " + this.clipRect.x + "px); ";
    }

    this.instance.style.cssText = styleText;
    //alert(this.instance.style.cssText);

    this.instance_img.width = (this.texture.width * this.scale.x);
    this.instance_img.height = (this.texture.height * this.scale.y);


  }
};

SmokeMonster.Label = function()
{
  this.instance = document.createElement('div');
  this.color = new SmokeMonster.Color();
  this.caption = "";
  this.visible = true;
  
  this.draw = function()
  {
    
  }
};

SmokeMonster.ButtonType =
{
  btRegular: 0,
  btRounded: 1,
  btGraphical: 2,
  btImage: 3
}

SmokeMonster.Button = function()
{
  this.buttonType = SmokeMonster.ButtonType.btGraphical;
  
  this.instance = document.createElement('div');
  
  
  this.draw = function()
  {
    
  }
};

SmokeMonster.GUI = new function()
{
  this.drawRect = function(rect, color)
  {
   
   
  }
  
  // Only working if CSS3 is supported
  this.drawRoundedRect = function(rect, color, roundRadius)
  {
    
    
  }
  
  // Only working if CSS3 is supported
  this.drawCircle = function(rect, color)
  {
    
    
  }
  
  
};